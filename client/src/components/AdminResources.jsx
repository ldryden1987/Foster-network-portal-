import { useState } from 'react';

export default function AdminResources() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            {/* button to add resources */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close Form" : "Add a Resource"}
            </button>
            {showForm && (
                <form style={{ marginTop: "1em" }}>
                    <div>
                        <label>
                            Name:
                            <input type="text" name="name" />
                        </label>
                    </div>
                    <div>
                        <label>
                            URL:
                            <input type="url" name="url" />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

