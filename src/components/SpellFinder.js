import React, { useState, useEffect } from 'react';
import SpellList from './SpellList';

const SpellFinder = () => {
  const [spells, setSpells] = useState([]);
  const [spellList, setSpellList] = useState('all');
  const [spellSchool, setSpellSchool] = useState('all');
  const [selectedSpell, setSelectedSpell] = useState(null);

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/spells')
      .then(response => response.json())
      .then(data => setSpells(data.results))
      .catch(error => {
        console.error('Error fetching spells:', error);
      });
  }, []);

  const handleSpellListChange = (list) => {
    setSpellList(list);
    setSelectedSpell(null);
  };

  const handleSpellSchoolChange = (school) => {
    setSpellSchool(school);
    setSelectedSpell(null);
  };

  const handleSelectSpell = (spell) => {
    setSelectedSpell(spell);
  }

  const renderDamageAtSlotLevel = (damageAtSlotLevel) => {
    return Object.entries(damageAtSlotLevel).map(([slotLevel, damage]) =>(
      <span key={slotLevel}><strong>Damage at slot level {slotLevel}:</strong> {damage}<br></br></span>
    ));
  };

  const renderDamageAtCharacterLevel = (damageAtCharacterLevel) => {
    return Object.entries(damageAtCharacterLevel).map(([characterLevel, damage]) =>(
      <span key={characterLevel}><strong>Damage at character level {characterLevel}:</strong> {damage}<br></br></span>
    ));
  };

  return (
    <div>
      <h1>Spell Finder</h1>
      {selectedSpell ? (
        <div className="spell-details">
          <button onClick={() => setSelectedSpell(null)}>Go Back</button>
          <h2>{selectedSpell.name}</h2>
          <section className="spell-info">
            <div className="spell-info-group-general">
              <h3>General Info</h3>
              <p><strong>Level:</strong> {selectedSpell.level}</p>
              <p><strong>School:</strong> {selectedSpell.school.name}</p>
              <p><strong>Classes:</strong> {selectedSpell.classes.map(cls => cls.name).join(', ')}</p>
              <p><strong>Subclasses:</strong> {selectedSpell.subclasses.map(subcls => subcls.name).join(', ')}</p>
              <p><strong>Ritual:</strong> {selectedSpell.ritual ? 'Yes' : 'No'}</p>
              <p><strong>Components:</strong> {selectedSpell.components.join(', ')}</p>
            </div>
            <div className="spell-info-group-mechanics">
              <h3>Spell Mechanics</h3>
              <p><strong>Casting Time:</strong> {selectedSpell.casting_time}</p>
              <p><strong>Attack Type:</strong> {selectedSpell.attack_type ? selectedSpell.attack_type : 'N/A'}</p>
              <p><strong>Range:</strong> {selectedSpell.range}</p>
              <p><strong>Damage Type:</strong> {selectedSpell.damage ? selectedSpell.damage.damage_type.name : 'N/A'}</p>
              {selectedSpell.damage && selectedSpell.damage.damage_at_slot_level && renderDamageAtSlotLevel(selectedSpell.damage.damage_at_slot_level)}
              {selectedSpell.damage && selectedSpell.damage.damage_at_character_level && renderDamageAtCharacterLevel(selectedSpell.damage.damage_at_character_level)}
              <p><strong>DC Type:</strong> {selectedSpell.dc ? selectedSpell.dc.dc_type.name : 'N/A'}</p>
              <p><strong>DC Success:</strong> {selectedSpell.dc ? selectedSpell.dc.dc_success : 'N/A'}</p>
              <p><strong>Duration:</strong> {selectedSpell.duration}</p>
              <p><strong>Area of Effect:</strong> {selectedSpell.area_of_effect ? (selectedSpell.area_of_effect.size + ' foot ' + selectedSpell.area_of_effect.type) : 'N/A'}</p>
              <p><strong>Concentration:</strong> {selectedSpell.concentration ? 'Yes' : 'No'}</p>
              <p><strong>Required Material:</strong> {selectedSpell.material}</p>
            </div>
            <div className="spell-info-group-desc">
              <h3>Higher Level Interactions and Description</h3>
              <p><strong>Higher Levels:</strong> {selectedSpell.higher_level && selectedSpell.higher_level.length > 0 ? selectedSpell.higher_level.join(' ') : 'N/A'}</p>
              <p><strong>Description:</strong> {selectedSpell.desc}</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="button-container">
          <div className="no-filter-buttons">
            <button onClick={() => handleSpellListChange('all')} className={spellList === 'all' ? 'selected' : ''}>All Spells</button>
            <button onClick={() => handleSpellSchoolChange('all')} className={spellSchool === 'all' ? 'selected' : ''}>All Schools</button>
          </div>
          <div className="class-buttons">
            <button onClick={() => handleSpellListChange('wizard')} className={spellList === 'wizard' ? 'selected' : ''}>Wizard</button>
            <button onClick={() => handleSpellListChange('sorcerer')} className={spellList === 'sorcerer' ? 'selected' : ''}>Sorcerer</button>
            <button onClick={() => handleSpellListChange('cleric')} className={spellList === 'cleric' ? 'selected' : ''}>Cleric</button>
            <button onClick={() => handleSpellListChange('druid')} className={spellList === 'druid' ? 'selected' : ''}>Druid</button>
            <button onClick={() => handleSpellListChange('bard')} className={spellList === 'bard' ? 'selected' : ''}>Bard</button>
            <button onClick={() => handleSpellListChange('paladin')} className={spellList === 'paladin' ? 'selected' : ''}>Paladin</button>
            <button onClick={() => handleSpellListChange('ranger')} className={spellList === 'ranger' ? 'selected' : ''}>Ranger</button>
            <button onClick={() => handleSpellListChange('warlock')} className={spellList === 'warlock' ? 'selected' : ''}>Warlock</button>
          </div>
          <div className="school-buttons">
            <button onClick={() => handleSpellSchoolChange('abjuration')} className={spellSchool === 'abjuration' ? 'selected' : ''}>Abjuration</button>
            <button onClick={() => handleSpellSchoolChange('conjuration')} className={spellSchool === 'conjuration' ? 'selected' : ''}>Conjuration</button>
            <button onClick={() => handleSpellSchoolChange('divination')} className={spellSchool === 'divination' ? 'selected' : ''}>Divination</button>
            <button onClick={() => handleSpellSchoolChange('enchantment')} className={spellSchool === 'enchantment' ? 'selected' : ''}>Enchantment</button>
            <button onClick={() => handleSpellSchoolChange('evocation')} className={spellSchool === 'evocation' ? 'selected' : ''}>Evocation</button>
            <button onClick={() => handleSpellSchoolChange('illusion')} className={spellSchool === 'illusion' ? 'selected' : ''}>Illusion</button>
            <button onClick={() => handleSpellSchoolChange('necromancy')} className={spellSchool === 'necromancy' ? 'selected' : ''}>Necromancy</button>
            <button onClick={() => handleSpellSchoolChange('transmutation')} className={spellSchool === 'transmutation' ? 'selected' : ''}>Transmutation</button>
          </div>
          <SpellList spells={spells} spellList={spellList} spellSchool={spellSchool} onSelectSpell={handleSelectSpell} />
        </div>
      )}
    </div>
  );
};

export default SpellFinder;