
export default function About() {
  return (
    <div>
      <h1 style={{fontSize: "2rem"}} >About This Project</h1>
      <p>
        This weather dashboard application is built for users to search for cities and get weather updates on them.
      </p>
      <h2 style={{marginTop: "3rem"}}>Features Implemented</h2>
      <ul>
        <li>- A/B Testing (by persisting them between session with sessionStorage)</li>
        <li>- Recent cities that were searched are persist through sessions (also with sessionStorage)</li>
        <li>- Weather API integration using OpenWeatherMap</li>
        <li>- Responsive UI with dynamic components</li>
      </ul>
      <h2 style={{marginTop: "3rem"}}>Technology Stack</h2>
      <ul>
        <li>* next.js 14</li>
        <li>* typeScript</li>
        <li>* redux toolkit for state management</li>
        <li>* openWeatherMap API</li>
      </ul>
    </div>
  );
}
