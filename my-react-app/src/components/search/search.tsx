import { Component } from 'react'
import './search.scss'
import { Dictionary, ResponseData, State } from '../../models/response.model'

class Search extends Component {
    readonly URL = 'https://swapi.dev/api/'
    test = ['111', '222222']
    state: State = {
        request: '',
        data: [],
        error: null,
    }

    handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ request: event.target.value })
    }

    handleSearchClick = () => {
        console.log('Search Query:', this.state.request)
        fetch(`${this.URL}/${this.state.request}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data: ResponseData<Dictionary<string | string[]>>) => {
                this.setState({ data: data.results })
            })
            .catch((error) => {
                this.setState({ error: error.message })
            })
    }

    render() {
        // console.log('test', this.state)
        return (
            <div className="search__wrapper">
                <div>
                    <input
                        className="search__input"
                        name="searchInput"
                        type="text"
                        placeholder="Search"
                        value={this.state.request}
                        onChange={this.handleUserInput}
                    />
                </div>
                <div>
                    <button
                        className="search__btn"
                        onClick={this.handleSearchClick}
                    >
                        Search
                    </button>
                </div>
            </div>
        )
    }
}

export default Search
