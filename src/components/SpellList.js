import React, { useState, useEffect } from 'react';

const SpellList = ({ spells, spellList, spellSchool, onSelectSpell }) => {
  const [detailedSpells, setDetailedSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);

  useEffect(() => {
    const fetchSpellDetails = async () => {
      const detailedSpellsPromises = spells.map(spell =>
        fetch(`https://www.dnd5eapi.co${spell.url}`)
          .then(response => response.json())
          .catch(error => {
            console.error('Error fetching spell details:', error);
            return null;
          })
      );
      const detailedSpells = await Promise.all(detailedSpellsPromises);
      setDetailedSpells(detailedSpells.filter(spell => spell !== null));
    };

    fetchSpellDetails();
  }, [spells]);

  const handleSpellClick = (spell) => {
    setSelectedSpell(spell);
    onSelectSpell(spell);
  };

  const filteredSpells = detailedSpells.filter(spell => {
    const matchesClass = spellList === 'all' || spell.classes.some(cls => cls.name.toLowerCase() === spellList);
    const matchesSchool = spellSchool === 'all' || spell.school.name.toLowerCase() === spellSchool;
    return matchesClass && matchesSchool;
  });

  const groupedSpells = {};
  filteredSpells.forEach(spell => {
    const level = spell.level !== undefined ? spell.level : 'Unknown';
    if (!groupedSpells[level]) {
      groupedSpells[level] = [];
    }
    groupedSpells[level].push(spell);
  });

  const renderSpellListByLevel = () => {
    const sortedLevels = Object.keys(groupedSpells).sort((a, b) => {
      if (a === 'Unknown') return 1;
      if (b === 'Unknown') return -1;
      return parseInt(a) - parseInt(b);
    });

    return sortedLevels.map(level => (
      <div key={level} className="spell-list-container">
        <h3>{level === 'Unknown' ? 'Unknown Level' : `Level ${level}`}</h3>
        {groupedSpells[level].map(spell => (
          <div key={spell.index}>
            <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={() => handleSpellClick(spell)}>{spell.name}</span>
          </div>
        ))}
      </div>
    ));
  };

    // return Object.keys(groupedSpells).map(level => (
    //   <div key={level} className="spell-list-container">
    //     <h3>{level === 'Unknown' ? 'Unknown Level' : `Level ${level}`}</h3>
    //     {groupedSpells[level].map(spell => (
    //       <div key={spell.index}>
    //         <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleSpellClick(spell)}>{spell.name}</span>
    //       </div>
    //     ))}
    //   </div>
    // ));
    // };

  return (
    <div>
      {renderSpellListByLevel()}
    </div>
  );
};

export default SpellList;
