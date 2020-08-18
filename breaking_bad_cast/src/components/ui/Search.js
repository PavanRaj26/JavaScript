import React,{useState} from 'react';

import logo from '../../img/logo.png'
const Search = ({getQuery}) => {
    const [text,setText] = useState('')

    const onChange = (q) => {
        setText(q)
        getQuery(q)
    }
    return (
        <section className='search'>
            <form>
                <input type="text" className='form-control' value={text}
                 placeholder="Search Characters" onChange={(e) => onChange(e.target.value)} autoFocus />
            </form>
        </section>
    )
}

export default Search;