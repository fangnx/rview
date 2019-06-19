import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Label, Dropdown } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import { logoutUser } from '../../actions/loginSignoutService';
import store from '../../store';

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn: false,
			userName: ''
		};
	}

	handleLogout = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	componentDidMount() {
		console.log(store.getState());
		if (store.getState().auth.isAuthenticated) {
			this.setState({
				isLoggedIn: true,
				userName: store.getState().auth.user['name']
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.auth);
		if (nextProps.auth.isAuthenticated) {
			this.setState({
				isLoggedIn: true,
				userName: nextProps.auth.user['name']
			});
		} else {
			this.setState({
				isLoggedIn: false,
				userName: ''
			});
		}
	}

	render() {
		const { isLoggedIn } = this.state;
		const { userName } = this.state;

		return (
			<HashRouter>
				<Menu inverted borderless className="header-menu">
					<Menu.Menu>
						<Menu.Item as={NavLink} to="/" exact name="main">
							<FontAwesomeIcon icon={['fas', 'water']} size="2x" />
						</Menu.Item>

						<Menu.Item as={NavLink} to="/myposts" name="addPost">
							MY POSTS
						</Menu.Item>

						<Menu.Item as={NavLink} to="/post/add" name="addPost">
							NEW POST
						</Menu.Item>
					</Menu.Menu>

					<Menu.Menu position="right" className="header-menu-rightmenu">
						{isLoggedIn ? (
							<Menu.Item>
								<Label as="a" color="teal" size="big" image>
									<span>{userName}</span>

									<Dropdown>
										<Dropdown.Menu floating>
											<Dropdown.Item text="View User Info" />

											<Dropdown.Item onClick={this.handleLogout} name="logout">
												<span>Log Out</span>
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Label>
							</Menu.Item>
						) : (
							<React.Fragment>
								<Menu.Item
									as={NavLink}
									to="/registration"
									name="register"
									color="teal"
								>
									<span>Register</span>
								</Menu.Item>

								<Menu.Item as={NavLink} to="/login" name="login" color="teal">
									<span>Log In</span>
								</Menu.Item>
							</React.Fragment>
						)}
					</Menu.Menu>
				</Menu>
			</HashRouter>
		);
	}
}

Header.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Header);
