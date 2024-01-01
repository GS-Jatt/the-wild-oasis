import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({options}){
    const [searchparam, setSearchParam]= useSearchParams()

    function headleClick(e){
        searchparam.set('sort', e.target.value);
        setSearchParam(searchparam);

    }
    return(
        <Select type='white' value={searchparam.get('sort')} options={options}  onChange={headleClick}>

        </Select>
    )
}