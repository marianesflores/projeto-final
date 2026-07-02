"use client";

import { useEffect, useState } from "react";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  async function carregarProdutos() {
    try {
      const resposta = await fetch("http://localhost:5500/api/produtos");
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function salvarProduto(e) {
    e.preventDefault();

    const produto = {
      nome,
      preco: Number(preco),
      estoque: Number(estoque),
    };

    try {
      if (idEditando) {
        await fetch(`http://localhost:5500/api/produtos/${idEditando}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produto),
        });

        alert("Produto atualizado com sucesso!");
      } else {
        await fetch("http://localhost:5500/api/produtos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produto),
        });

        alert("Produto cadastrado com sucesso!");
      }

      setNome("");
      setPreco("");
      setEstoque("");
      setIdEditando(null);

      carregarProdutos();
    } catch {
      alert("Erro ao salvar produto.");
    }
  }

  function editarProduto(produto) {
    setIdEditando(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setEstoque(produto.estoque);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function excluirProduto(id) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (!confirmar) return;

    try {
      await fetch(`http://localhost:5500/api/produtos/${id}`, {
        method: "DELETE",
      });

      alert("Produto excluído!");

      carregarProdutos();
    } catch {
      alert("Erro ao excluir.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-red-900 text-yellow-200 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-6">
          <div>
            <h1 className="text-3xl font-bold">
              🍴 Cantinho do Sabor
            </h1>

            <p className="text-yellow-100">
              Gerenciamento de Produtos
            </p>
          </div>

          <div className="rounded-xl bg-yellow-200 px-6 py-3 text-center text-red-900 shadow">
            <p className="text-sm">Produtos</p>

            <p className="text-3xl font-bold">
              {produtos.length}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl p-8">

        <section className="mb-8 rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold text-red-900">
            {idEditando ? "Editar Produto" : "Novo Produto"}
          </h2>

          <form
            onSubmit={salvarProduto}
            className="grid gap-4 md:grid-cols-4"
          >
            <input
              className="rounded-xl border p-3 outline-none focus:border-red-900"
              placeholder="Nome do produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <input
              className="rounded-xl border p-3 outline-none focus:border-red-900"
              placeholder="Preço"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />

            <input
              className="rounded-xl border p-3 outline-none focus:border-red-900"
              placeholder="Estoque"
              type="number"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              required
            />

            <button
              type="submit"
              className="rounded-xl bg-red-900 font-semibold text-yellow-200 transition hover:bg-red-800"
            >
              {idEditando ? "Salvar" : "Cadastrar"}
            </button>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white shadow">

          <div className="border-b p-6">
            <h2 className="text-2xl font-bold text-red-900">
              Produtos cadastrados
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-red-900 text-yellow-200">

              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Preço</th>
                <th className="p-4 text-left">Estoque</th>
                <th className="p-4 text-center">Ações</th>
              </tr>

            </thead>

            <tbody>

              {produtos.length === 0 ? (

                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-slate-500"
                  >
                    Nenhum produto cadastrado.
                  </td>
                </tr>

              ) : (

                produtos.map((produto) => (

                  <tr
                    key={produto.id}
                    className="border-b transition hover:bg-red-50"
                  >
                    <td className="p-4 font-medium">
                      {produto.nome}
                    </td>

                    <td className="p-4">
                      R$ {Number(produto.preco).toFixed(2)}
                    </td>

                    <td className="p-4">
                      {produto.estoque}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => editarProduto(produto)}
                          className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-red-900 transition hover:bg-yellow-300"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => excluirProduto(produto.id)}
                          className="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                        >
                          Excluir
                        </button>

                      </div>
                    </td>

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