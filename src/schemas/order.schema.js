const { z } = require("zod");

const itemSchema = z.object({
  idItem: z.string().min(1, "Id Item é obrigatório"),
  quantidadeItem: z
    .number()
    .int()
    .positive("Quantidade Item deve ser um número inteiro positivo"),
  valorItem: z.number().positive("Valor Item deve ser um número positivo"),
});

const postOrderSchema = z.object({
  numeroPedido: z.string().min(1, "Numero Pedido é obrigatório"),
  valorTotal: z.number().positive("Valor Total deve ser um número positivo"),
  dataCriacao: z.coerce.date({
    message: "Data criação inválida",
  }),
  items: z.array(itemSchema).min(1, "O pedido deve ter pelo menos um item"),
});

const putOrderSchema = z.object({
  valorTotal: z.number().positive("Valor Total deve ser um número positivo"),
  dataCriacao: z.coerce.date({
    message: "Data criação inválida",
  }),
  items: z.array(itemSchema).min(1, "O pedido deve ter pelo menos um item"),
});

module.exports = {
  postOrderSchema,
  putOrderSchema,
};
