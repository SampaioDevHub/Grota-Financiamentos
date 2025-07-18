"use client";
import { PageContainer } from "@/src/presentation/layout/components/container/page-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/presentation/layout/components/ui/card";
import { Header } from "@/src/presentation/layout/components/ux/Header/components/headerContainer";

export default function Dashboard() {
  return (
    <PageContainer>
      <div className="max-w-[75rem] sm:ml-5 mt-2 sm:mt-2 sm:max-w-[88rem] sm:rounded-md sm:p-5 bg-gray-200 p-5 rounded-none">
        <Header />
      </div>
      <div className="max-w-[75rem] sm:ml-5 mt-2 sm:mt-2 sm:max-w-[88rem] sm:rounded-md sm:p-10 bg-gray-200 p-5 rounded-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>[string]</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">[number]</p>
              <p className="text-sm text-muted-foreground">[string]</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>[string]</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">[number]</p>
              <p className="text-sm text-muted-foreground">[string]</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>[string]</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">[number]</p>
              <p className="text-sm text-muted-foreground">[string]</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
