import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            max_presentations: '',
            max_attendees: '',
            location: '',
            locations: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaximumPresentationsChange = this.handleMaximumPresentationsChange.bind(this);
        this.handleMaximumAttendeesChange = this.handleMaximumAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleStartsChange(event) {
        const value = event.target.value;
        this.setState({starts: value})
    }

    handleEndsChange(event) {
        const value = event.target.value;
        this.setState({ends: value})
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value})
    }

    handleMaximumPresentationsChange(event) {
        const value = event.target.value;
        this.setState({max_presentations: value})
    }

    handleMaximumAttendeesChange(event) {
        const value = event.target.value;
        this.setState({max_attendees: value})
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.locations;
        console.log("hello")

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        console.log(data)
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applications/json',
            },
        };
        console.log(data)
        console.log(fetchConfig)
        console.log(conferenceUrl)
        const response = await fetch(conferenceUrl, fetchConfig);
        console.log(response)
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference)
            const cleared = {
                name: '',
                starts: '',
                ends: '',
                description: '',
                max_presentations: '',
                max_attendees: '',
                location: '',
            };
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if(response.ok) {
            const data = await response.json();
            this.setState({'locations': data.locations});
        }
    }

    render () {
        return (
            <div className="my-5 container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new conference</h1>
                            <form onSubmit={this.handleSubmit} id="create-conference-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name"
                                        className="form-control"/>
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleStartsChange} value={this.state.starts} placeholder="Starts" required type="date" name="starts" id="starts"
                                        className="form-control"/>
                                    <label htmlFor="starts">Starts</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleEndsChange} value={this.state.ends} placeholder="Ends" required type="date" name="ends" id="ends"
                                        className="form-control"/>
                                    <label htmlFor="ends">Ends</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea onChange={this.handleDescriptionChange} value={this.state.description} required className="form-control" id="description" rows="3"></textarea>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleMaximumPresentationsChange} value={this.state.max_presentations} placeholder="Maximum presentations" required type="number"
                                        name="max_presentations" id="max_presentations" className="form-control"/>
                                    <label htmlFor="max_presentations">Maximum Presentations</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleMaximumAttendeesChange} value={this.state.max_attendees} placeholder="Maximum attendees" required type="number" name="max_attendees"
                                        id="max_attendees" className="form-control"/>
                                    <label htmlFor="max_attendees">Maximum Attendees</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleLocationChange} value={this.state.location} required name="location" id="location" className="form-select">
                                        <option value="">Choose a location</option>
                                        {this.state.locations.map(location => {
                                            return (
                                                <option key={location.id} value={location.id}>
                                                    {location.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConferenceForm;
