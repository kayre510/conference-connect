import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm  from './AttendConferenceForm';

// function App(props) {
//   if (props.attendees === undefined) {
//     return null;
//   }
//   return (
//     <>
//       <Nav />
//       <div className="container">
//         {/* <AttendConferenceForm/> */}
//         {/* <ConferenceForm /> */}
//         {<LocationForm />}

//         {/* <AttendeesList attendees={props.attendees} /> */}
//       </div>
//     </>
//   );
// }

// export default App;

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
          <Routes>
            <Route path="conferences/new" element={<ConferenceForm />} />
            <Route path="attendees/new" element={<AttendConferenceForm />} />
            <Route path="locations/new" element={<LocationForm />} />
            <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App
