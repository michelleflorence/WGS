import React, { useState } from "react";

function Hooks() {
    const [color, setColor] = useState('Grey')

    return (
        <div className="ui container py-8">
            <p style={{ color: color }} className="mb-7 text-center font-bold text-xl">Color Change {color}</p>
            <div className="text-center">
                <button className="ui small button pink" onClick={() => setColor('Pink')}>
                    Button Pink
                </button>

                <button className="ui small button purple" onClick={() => setColor('Purple')}> 
                    Button Purple
                </button>

                <button className="ui small button green" onClick={() => setColor('Green')}>
                    Button Green
                </button>

                <button className="ui small button blue" onClick={() => setColor('Blue')}>
                    Button Blue
                </button>
            </div>
            
        </div>
    )
}

export default Hooks