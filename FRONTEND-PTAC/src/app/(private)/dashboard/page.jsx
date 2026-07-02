"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch("http://localhost:5500/api/produtos");
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (error) {
        console.log("Erro ao carregar produtos:", error);
      }
    }

    carregarProdutos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Cabeçalho */}
      <header className="bg-red-900 text-yellow-200 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-6">
          <div>
            <h1 className="text-3xl font-bold">🍴 Cantinho do Sabor</h1>
            <p className="text-sm text-yellow-100">
              Sistema de gerenciamento de produtos
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-lg border border-yellow-200 px-4 py-2 transition hover:bg-yellow-200 hover:text-red-900"
          >
            Sair
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl p-8">
        {/* Card de resumo */}
        <section className="mb-8">
          <div className="max-w-xs rounded-2xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-slate-700">
              Produtos cadastrados
            </h2>

            <p className="mt-2 text-5xl font-bold text-red-900">
              {produtos.length}
            </p>
          </div>
        </section>

        {/* Botão */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/produtos"
            className="rounded-xl bg-red-900 px-5 py-3 font-semibold text-yellow-200 transition hover:bg-red-800"
          >
            Gerenciar Produtos
          </Link>
        </div>

        {/* Tabela */}
        <section className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="border-b p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Produtos cadastrados
            </h2>
          </div>

          <table className="w-full">
            <thead className="bg-red-900 text-yellow-200">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Preço</th>
                <th className="p-4 text-left">Estoque</th>
              </tr>
            </thead>

            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="p-8 text-center text-slate-500"
                  >
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : (
                produtos.map((produto) => (
                  <tr
                    key={produto.id}
                    className="border-b transition hover:bg-slate-50"
                  >
                    <td className="p-4 font-medium">{produto.nome}</td>

                    <td className="p-4">
                      R$ {Number(produto.preco).toFixed(2)}
                    </td>

                    <td className="p-4">{produto.estoque}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}