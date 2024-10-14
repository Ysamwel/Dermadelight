function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Oops! Page Not Found</h1>
      <img 
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" 
        alt="Not Found" 
        className="not-found-gif" 
      />
      <p>It seems like you've lost your way. Let's get you back home.</p>
    </div>
  );
}

export default NotFound;
