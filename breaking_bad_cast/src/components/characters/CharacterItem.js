import React from 'react';

const CharacterItem = ({item}) => {
    return (
        <div className='card'>
      <div className='card-inner'>
        <div className='card-front'>
          <img src={item.image.url} alt='' />
        </div>
        <div className='card-back'>
          <h1>{item.name}</h1>
          <ul>
            <li>
              <strong>Id:</strong> {item.id}
            </li>
            <li>
              <strong>Full Name:</strong> {item["biography"]["full-name"]}
            </li>
            <li>
              <strong>Birthplace:</strong> {item["biography"]["place-of-birth"]}
            </li>
            <li>
              <strong>Occupation:</strong> {item.work.occupation}
            </li>
          </ul>
        </div>
      </div>
    </div>
    )
}

export default CharacterItem;