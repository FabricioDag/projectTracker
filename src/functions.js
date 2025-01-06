const [lastPeriod, setLastPeriod] = useState({inicio:'', fim:''})
const [actualPeriod, setActualPeriod] = useState({inicio:'', fim:''})

const calcularPeriodoAnterior = (opcao) => { // calcula o ultimo periodo (ontem, semana passada, mes passado)
    // fazer cache dos periodos
    const hoje = new Date('2025-1-5');
    alert(hoje)
    
    switch (opcao) {
      case 'daily':
        const ontem = new Date(hoje);
        ontem.setDate(hoje.getDate() - 1);
        return { inicio: ontem, fim: ontem };
  
      case 'weekly':
        const inicioSemana = new Date(hoje);
        const fimSemana = new Date(hoje);
        const diaAtual = hoje.getDay(); // 0 = domingo, 6 = sábado
        inicioSemana.setDate(hoje.getDate() - diaAtual - 6);
        fimSemana.setDate(hoje.getDate() - diaAtual);
        return { inicio: inicioSemana, fim: fimSemana };
  
      case 'monthly':
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
        const fimMes = new Date(hoje.getFullYear(), hoje.getMonth(), 0); // Último dia do mês anterior
        return { inicio: inicioMes, fim: fimMes };
  
      default:
        throw new Error('Opção inválida');
    }
  };

  const calcularPeriodoAtual = (opcao) => { // calcula o periodo atual (hoje, semana atual, mes atual)
    // fazer cache dos periodos
    const hoje = new Date('2025-1-5');
    switch (opcao) {
      case 'daily':
        return { inicio: hoje, fim: hoje };
  
      case 'weekly':
        const diaAtual = hoje.getDay(); // 0 = domingo, 6 = sábado
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - diaAtual);
        return { inicio: inicioSemana, fim: hoje };
  
      case 'monthly':
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        return { inicio: inicioMes, fim: hoje };
  
      default:
        throw new Error('Opção inválida');
    }
  }

  const handleChangeTimeframe = (value) =>{
    setTimeFrame(value)
    setLastPeriod(calcularPeriodoAnterior(value))
    setActualPeriod(calcularPeriodoAtual(value))
  }