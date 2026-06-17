import { useState} from 'react';
import InputField from './InputField';
import Button from './Button';

export default function SearchResComp() {
    const [srchInput, setSrchInput] = useState('');
    const data = false;

    return(
        <div className="flex flex-col gap-3 md:flex-row md:items-end justify-center">
            { data ? <>
                        <InputField
                            style="w-full md:flex-1"
                            text="Search by name"
                            value={srchInput}
                            onChange={(e) => setSrchInput(e.target.value)}
                        />
                        <Button style="w-full md:w-28 bg-blue-600/60">
                                Search
                        </Button>
                    </> 
            : <p className="text-slate-400">Select all from the filter above to start searching</p>}
        </div>
    );
}