import { prisma } from "../lib/prisma.js";

export async function listarProdutos() {
  return await prisma.produto.findMany();
}

export async function buscarProdutoPorId(id) {
  return await prisma.produto.findUnique({
    where: { id },
  });
}

export async function criarProduto(dados) {
  return await prisma.produto.create({
    data: dados,
  });
}

export async function atualizarProduto(id, dados) {
  return await prisma.produto.update({
    where: { id },
    data: dados,
  });
}

export async function deletarProduto(id) {
  return await prisma.produto.delete({
    where: { id },
  });
}