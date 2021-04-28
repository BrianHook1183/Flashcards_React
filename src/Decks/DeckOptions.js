function DeckOptions() {
  return (
    <div
      className="btn-toolbar justify-content-between"
      role="toolbar"
      aria-label="Deck Options"
    >
      <div className="btn-group" role="group" aria-label="View/Study group">
        <button type="button" className="btn btn-secondary">
          View
        </button>
        <button type="button" className="btn btn-primary">
          Study
        </button>
      </div>
      <div className="btn-group"  role="group" aria-label="Delete group">
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckOptions;
