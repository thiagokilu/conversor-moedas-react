import { useState, useEffect } from 'react';
import Flag from 'react-world-flags';
import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const [moeda1, setMoeda1] = useState('USD');
  const [moeda2, setMoeda2] = useState('BRL');
  const [data, setData] = useState(null);
  const [date, setDate] = useState(0);
  const [flagCode1, setFlagCode1] = useState('US');
  const [flagCode2, setFlagCode2] = useState('BR');

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,USD-EUR,EUR-USD,BTC-USD,BTC-EUR')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Exibe os dados no console
        setData(data); // Atualiza o estado
      })
      .catch(error => console.error('Erro ao buscar os dados:', error));
  }, []);

  const handleChangeMoeda1 = (e) => {
    const moedaAtual1 = e.target.value;
    setMoeda1(moedaAtual1);

    let flagCodeAtual = 'US';
    if (moedaAtual1 === 'USD') flagCodeAtual = 'US';
    else if (moedaAtual1 === 'EUR') flagCodeAtual = 'EU'; // Alemanha como representação da UE
    else if (moedaAtual1 === 'BTC') flagCodeAtual = 'BTC';
    else if (moedaAtual1 === 'BRL') flagCodeAtual = 'BR';

    setFlagCode1(flagCodeAtual);
  };

  const handleChangeMoeda2 = (e) => {
    const moedaAtual2 = e.target.value;
    setMoeda2(moedaAtual2);

    let flagCodeAtual = 'BR';
    if (moedaAtual2 === 'USD') flagCodeAtual = 'US';
    else if (moedaAtual2 === 'EUR') flagCodeAtual = 'EU';
    else if (moedaAtual2 === 'BTC') flagCodeAtual = 'BTC';
    else if (moedaAtual2 === 'BRL') flagCodeAtual = 'BR';

    setFlagCode2(flagCodeAtual);
  };

  const handleChangeInput = (e) => {
    if (moeda1 === moeda2) {
      setValue("moedas são iguais!");
    } else if(moeda2 === 'BTC'){
      setValue("ainda não e possive fazer esse tipo de conversão")
    }else {
      const valorInput = e.target.value;
      const parMoeda = `${moeda1}${moeda2}`;
  
      const taxaConversao = data[parMoeda].bid
      const dataConversao = data[parMoeda].create_date;
  
      setDate(dataConversao);
      const valorConvertido = valorInput * taxaConversao
      const formatoMoeda = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: moeda2, // Define a moeda do resultado
      }).format(valorConvertido);
    
      setValue(formatoMoeda);
    }

  };

  return (
    <div className="bg-white p-10 text-black flex flex-col gap-5 text-2xl rounded-lg">
      <div className="flex flex-row items-center gap-5">
        <Flag code={flagCode1} width={50} />
        {moeda1 === 'BTC' && (
          <span className="bg-[#ef8e19] text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
            ₿
          </span>
        )}

        <select name="moeda1" onChange={handleChangeMoeda1} className="bg-gray-900 text-white p-2 rounded-lg">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="BTC">BTC</option>
          <option value="BRL">BRL</option>
        </select>
        <select name="moeda2" onChange={handleChangeMoeda2} className="bg-gray-900 text-white p-2 rounded-lg">
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="BTC">BTC</option>
        </select>
        <Flag code={flagCode2} width={50} />
        {moeda2 === 'BTC' && (
          <span className="bg-[#ef8e19] text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
            ₿
          </span>
        )}
      </div>
      <input type="number" onChange={handleChangeInput} className="bg-gray-900 text-white p-2 rounded-lg" />
      <p>Resultado: {value}</p>
      <p>Data: {date}</p>
    </div>
  );
}

export default App;
