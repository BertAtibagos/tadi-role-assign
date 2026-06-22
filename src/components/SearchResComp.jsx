import { useState} from 'react';
import InputField from './InputField';
import Button from './Button';
import ClassListTable from './ClassListTable';

export default function SearchResComp(props) {
    const [srchInput, setSrchInput] = useState('');
    const { classList, classErr } = props;

    if(classErr) return <p className="text-red-500">Something went wrong.</p>;

    return(
             classList.length ? <>
                            <div className="flex flex-col md:flex-row gap-3 w-full">
                                <InputField
                                    style="w-full md:flex-1"
                                    text="Search by name"
                                    value={srchInput}
                                    onChange={(e) => setSrchInput(e.target.value)}
                                />
                                <Button style="w-full md:w-28 bg-blue-600/60">
                                        Search
                                </Button>
                            </div>
                            <ClassListTable
                                classListData={classList}
                            />
                        </>
            : <div className="flex justify-center">
                <p className="text-slate-400">Select all from the filter above to start searching</p>
            </div>
    );
}