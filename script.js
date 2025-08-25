let historico = [];

function inserir(valor) {
  document.getElementById("expressao").value += valor;
}

function calcular() {
  let expressao = document.getElementById("expressao").value;
  let resultado;

  try {
    if (/[^0-9+\-*/().%! logsqrt]/.test(expressao)) {
      throw "Expressão inválida!";
    }

    expressao = expressao.replace(/√/g, "Math.sqrt");   
    expressao = expressao.replace(/sqrt\(/g, "Math.sqrt("); 
    expressao = expressao.replace(/log\(/g, "Math.log10("); 
    expressao = expressao.replace(/%/g, "/100");       

    if (expressao.includes("!")) {
      expressao = tratarFatorial(expressao);
    }

    resultado = eval(expressao);

    if (resultado === Infinity || resultado === -Infinity) {
      throw "Erro: divisão por zero!";
    }

    document.getElementById("resultado").innerText = "Resultado: " + resultado;

    historico.push(document.getElementById("expressao").value + " = " + resultado);
    atualizarHistorico();

  } catch (erro) {
    document.getElementById("resultado").innerText = "Erro: " + erro;
  }
}

function limpar() {
    document.getElementById("expressao").value = "";
    document.getElementById("resultado").innerText = "Resultado: ";
  }

function atualizarHistorico() {
  let lista = document.getElementById("historico");
  lista.innerHTML = ""; 
  historico.slice(-5).forEach(item => { 
    let li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });
}

function tratarFatorial(expr) {
  return expr.replace(/(\d+)!/g, function(_, n) {
    return fatorial(parseInt(n));
  });
}

function fatorial(n) {
  if (n < 0) throw "Fatorial não existe para negativos!";
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}
