import Button from './components/Button';
import Yrdropdown from './components/Yrdropdown';
import Prddropdown from './components/Prddropdown';
import InputField from './components/InputField';

const App = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 w-1/2 mx-auto">
      <div className="border border-gray-600/50 rounded-2xl p-4 flex items-center justify-center gap-2">
        <Yrdropdown style="bg-gray-600/50 rounded-xl w-64 p-2"/>
        <Prddropdown style="bg-gray-600/50 rounded-xl w-64 p-2"/>
        <Button 
          style="bg-blue-600/50 rounded-xl w-24 p-2" 
          text="Search"/>
      </div>
      <div>
        <InputField 
          style="bg-gray-600/50 rounded-xl w-64 p-2 mx-2" 
          text="Search by name"/>
        <Button 
          style="bg-green-600/50 rounded-xl w-24 p-2" 
          text="Search"/>
      </div>
    </div>
  )
}

export default App;