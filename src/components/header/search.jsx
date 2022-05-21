import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const SearchBar = () =>{

    const [keyword, setKeyword] = useState("");

    return (
        <>
            <input value={keyword} onChange={e => {setKeyword(e.currentTarget.value)}} type="text" placeholder='Tìm thành viên hoặc bài viết...'/>
            <div title='Tìm'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </>
    )
}

export default SearchBar;