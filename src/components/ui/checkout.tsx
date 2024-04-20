import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Buy from "../razorpay/Buy";
import { Suspense } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { CheckedItem } from "@/lib/interfaces";
import renderCheckedItemsList from "./renderCheckedItemList";

export default function Checkout({
  technicalCheckedItems,
  nontechnicalCheckedItems,
  culturalCheckedItems,
  megaCheckedItems,
  sumOfCheckedItemsAmount,
  phoneNumber,
}: {
  technicalCheckedItems: CheckedItem[];
  nontechnicalCheckedItems: CheckedItem[];
  culturalCheckedItems: CheckedItem[];
  megaCheckedItems: CheckedItem[];
  sumOfCheckedItemsAmount: number;
  phoneNumber: string;
}) {
  const session = useSession({
    required: true,
  });
  return (
    <Card className="overflow-hidden w-full max-w-lg">
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <h1 className="text-lg font-semibold">Events summary</h1>
          {renderCheckedItemsList(technicalCheckedItems, "technical")}
          {renderCheckedItemsList(nontechnicalCheckedItems, "nontechnical")}
          {renderCheckedItemsList(culturalCheckedItems, "cultural")}
          {renderCheckedItemsList(megaCheckedItems, "mega")}
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>
                {"\u20B9"}
                {sumOfCheckedItemsAmount} /-
              </span>
            </li>
          </ul>
          <Suspense fallback={null}>
            <Buy
              name={session.data?.user?.name!}
              email={session.data?.user?.email!}
              contact={phoneNumber}
              amount={sumOfCheckedItemsAmount}
            />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
