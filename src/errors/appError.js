// Aqui faço uso da herança para criar classes de erro especificas para a api,
// facilitando a identificação e tratamento de erros

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(message = "Pedido não encontrado") {
    super(message, 404);
  }
}

class ConflictError extends AppError {
  constructor(message = "Pedido com esse ID já existe") {
    super(message, 400);
  }
}

module.exports = { AppError, NotFoundError, ConflictError };
