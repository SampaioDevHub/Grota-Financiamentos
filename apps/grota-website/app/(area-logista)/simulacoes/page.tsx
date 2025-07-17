"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import axios from "axios";
import { PageContainer } from "@/src/presentation/layout/components/container/page-container";
import { Card, CardContent } from "@/src/presentation/layout/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/presentation/layout/components/ui/table";
import { Button } from "@/src/presentation/layout/components/ui/button";

export default function Simulacoes() {
  const [placa, setPlaca] = useState("");
  const [loading, setLoading] = useState(false);
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [erro, setErro] = useState("");

const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const buscarVeiculo = async () => {
    const placaLimpa = placa.replace(/\W/g, "").toUpperCase();
    if (!placaLimpa || placaLimpa.length < 7) {
      setErro("Placa inválida");
      return;
    }

    setLoading(true);
    setErro("");
    setVeiculos([]);

    try {
      const { data } = await axios.post(
        "https://gateway.apibrasil.io/api/v2/vehicles/base/001/consulta",
        {
          placa: placaLimpa,
          tipo: "fipe",
        },
        {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dhdGV3YXkuYXBpYnJhc2lsLmlvL2FwaS92Mi9hdXRoL3JlZ2lzdGVyIiwiaWF0IjoxNzQwMzE4NjYxLCJleHAiOjE3NzE4NTQ2NjEsIm5iZiI6MTc0MDMxODY2MSwianRpIjoiNTBpUDBMZlRScXRMcjJnNyIsInN1YiI6IjEzOTY3IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.dsHtxbpV7o9nANhtEm50YvRtaxYghsNYopwhO8Sr-L4",
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.error === false && Array.isArray(data.data)) {
        setVeiculos(data.data);
      } else {
        setErro("Nenhum veículo encontrado.");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setErro(err.response.data.message);
      } else {
        setErro("Erro ao buscar veículo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
       <div className="py-1 px-5">
        <Card className="flex flex-col justify-center items-center min-h-[100vh] w-full max-w-5xl mx-auto p-6">
          <CardContent className="w-full space-y-6">
            <input
              type="text"
              placeholder="Digite a placa do veículo"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              className="border px-4 py-2 rounded w-full uppercase"
            />

            <Button
              onClick={buscarVeiculo}
              className="cursor-pointer text-white px-4 py-2 rounded w-96"
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar veículo na FIPE"}
            </Button>

            {erro && <p className="text-red-500">{erro}</p>}

            {veiculos.length > 0 && (
              <div className="space-y-12">
                {veiculos.map((veiculo, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {veiculo.marca} - {veiculo.modelo}
                    </h3>

                    <Table>
                      <TableHeader>
                        <TableRow className="bg-orange-500 hover:bg-orange-600">
                          <TableHead>Marca</TableHead>
                          <TableHead>Modelo</TableHead>
                          <TableHead>Ano</TableHead>
                          <TableHead>Valor FIPE</TableHead>
                          <TableHead>Código FIPE</TableHead>
                          <TableHead>Mês Referência</TableHead>
                          <TableHead>Ver FIPE</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{veiculo.marca}</TableCell>
                          <TableCell>{veiculo.modelo}</TableCell>
                          <TableCell>
                            {veiculo.anoFabricacao}/{veiculo.anoModelo}
                          </TableCell>
                          <TableCell>{formatarPreco(veiculo.valor)}</TableCell>
                          <TableCell>{veiculo.codigoFipe}</TableCell>
                          <TableCell>{veiculo.mesReferencia}</TableCell>
                          <TableCell>
                            <a
                              href={veiculo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Acessar
                            </a>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <h4 className="text-sm font-medium text-gray-600 mt-4">Histórico de Preços:</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mês</TableHead>
                          <TableHead>Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {veiculo.historico.map((h: any, idx: number) => (
                          <TableRow key={idx}>
                            <TableCell>{h.mes}</TableCell>
                            <TableCell>{formatarPreco(h.valor)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
