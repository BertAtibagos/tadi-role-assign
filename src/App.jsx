import { useYears } from './hooks/useYears';
import { usePeriod} from './hooks/usePeriod';
import SearchFilterCard from './components/SearchFilterCard';

const App = () => {
  const { years, yrErr } = useYears();
  const { period, prdErr } = usePeriod();


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <SearchFilterCard 
          years={years} 
          yrErr={yrErr} 
          period={period} 
          prdErr={prdErr} 
        />
      </div>
    </div>
  )
}

export default App;