/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { PageContainer } from "@/src/presentation/layout/components/container/page-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/presentation/layout/components/ui/card";
import { Button } from "@/src/presentation/layout/components/ui/button";
import { Input } from "@/src/presentation/layout/components/ui/input";
import { Label } from "@/src/presentation/layout/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/presentation/layout/components/ui/table";
import { Badge } from "@/src/presentation/layout/components/ui/badge";

export default function ListaDeClientes() {
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState<any>(null);
  const [erro, setErro] = useState("");

  const formatarCPF = useCallback((value: string) => {
    const cpfLimpo = value.replace(/\D/g, "");
    let cpfFormatado = cpfLimpo;
    if (cpfLimpo.length > 3) cpfFormatado = cpfLimpo.replace(/^(\d{3})(\d)/, "$1.$2");
    if (cpfLimpo.length > 6) cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (cpfLimpo.length > 9) cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    return cpfFormatado;
  }, []);

  const handleChangeCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatarCPF(e.target.value));
  };

  const buscarCliente = async () => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    if (!cpfLimpo || cpfLimpo.length !== 11) {
      setErro("CPF inválido. Digite um CPF com 11 dígitos.");
      return;
    }

    setLoading(true);
    setErro("");
    setCliente(null);

    try {
      const { data } = await axios.post(
        "https://gateway.apibrasil.io/api/v2/dados/cpf/credits",
        { cpf: cpfLimpo },
        {
          headers: {
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dhdGV3YXkuYXBpYnJhc2lsLmlvL2FwaS92Mi9hdXRoL3JlZ2lzdGVyIiwiaWF0IjoxNzQwMzE4NjYxLCJleHAiOjE3NzE4NTQ2NjEsIm5iZiI6MTc0MDMxODY2MSwianRpIjoiNTBpUDBMZlRScXRMcjJnNyIsInN1YiI6IjEzOTY3IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.dsHtxbpV7o9nANhtEm50YvRtaxYghsNYopwhO8Sr-L4",
            "Content-Type": "application/json",
          },
        }
      );
      setCliente(data);
    } catch (err: any) {
      setErro(err.response?.data?.message ?? "Erro ao buscar CPF");
    } finally {
      setLoading(false);
    }
  };

  const dados = cliente?.response?.content?.nome?.conteudo;

  return (
    <PageContainer>
      <div className="py-6 px-5">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center">Consulta de Clientes</CardTitle>
          </CardHeader>
          
          <CardContent className="w-full space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF do Cliente</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="Digite o CPF (ex: 000.000.000-00)"
                value={cpf}
                onChange={handleChangeCPF}
                className="w-full"
                maxLength={14}
              />
              <p className="text-xs text-gray-500">Digite o CPF com 11 dígitos para consultar os dados do cliente</p>
            </div>

            <Button
              onClick={buscarCliente}
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Consultando...
                </>
              ) : (
                "Consultar CPF"
              )}
            </Button>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
                {erro}
              </div>
            )}

            {cliente?.error === false && dados && (
                <div className="bg-white border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center">
                    Dados do Cliente
                    <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                      Consulta Realizada com Sucesso
                    </Badge>
                  </h3>
                </div>
                
                <div className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px] font-semibold">Informação</TableHead>
                        <TableHead>Dados</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium bg-gray-50">Nome Completo</TableCell>
                        <TableCell>{dados.nome}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-gray-50">CPF</TableCell>
                        <TableCell>{dados.documento}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-gray-50">Data de Nascimento</TableCell>
                        <TableCell>{dados.data_nascimento}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-gray-50">Idade</TableCell>
                        <TableCell>{dados.idade} anos</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-gray-50">Sexo</TableCell>
                        <TableCell>{dados.sexo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-gray-50">Nome da Mãe</TableCell>
                        <TableCell>{dados.mae}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-gray-50">Situação na Receita</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={dados.situacao_receita.toLowerCase().includes('regular') 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : 'bg-yellow-100 text-yellow-800 border-yellow-200'}
                          >
                            {dados.situacao_receita}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-gray-50">Data da Situação</TableCell>
                        <TableCell>{dados.situacao_receita_data}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
