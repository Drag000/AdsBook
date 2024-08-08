export default function CreateAd() {
    return (
            <form className="w-25 m-auto p-3 my-5 border">
                <h3>Create Add</h3>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-3">
                    <label>Condition</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder=" "
                    />
                </div>
                <div className="mb-3">
                    <label>Location</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder=" "
                    />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder=" "
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        type="textarea"
                        className="form-control"
                        placeholder="Please describe.."
                    />
                </div>
                <div className="mb-3">
                    <label>Photo</label>
                    <input
                        type="url"
                        className="form-control"
                        placeholder="Please add url"
                    />
                </div>
                
                
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>
                </div>
            </form>
    );
}