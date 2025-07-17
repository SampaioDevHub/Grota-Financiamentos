import { PageContainer } from "@/src/presentation/layout/components/container/page-container";
import {
  Card,
  CardContent,
} from "@/src/presentation/layout/components/ui/card";

export default function Configuracoes() {
  return (
    <PageContainer>
      <div className="py-1 px-5 ">
        <Card className="flex justify-center items-center h-[100vh]">
          <CardContent>Container</CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
