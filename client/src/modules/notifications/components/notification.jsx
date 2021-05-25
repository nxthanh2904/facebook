import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';
import { connect, useSelector } from 'react-redux';
import { Avatar } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { PostActions } from '../../posts/redux/actions';
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import moment from 'moment';

const Notifications = (props) => {
	const { notify } = useSelector(state => state.notification);
	const { user } = useSelector(state => state.auth)

	const onClickNotify = (id) => {
		props.getPostById(id);
	}

	const listNotify = notify?.data?.filter(e =>
		e.from._id !== user._id
	).reverse();
	console.log('list notify', listNotify);
	const count = listNotify?.length;

	return (
		<div className="navbar-custom-menu">
			<ul className="nav navbar-nav">
				<li className="dropdown notifications-menu">
					<a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
						<Badge badgeContent={count} max={9} {...defaultProps} />
					</a>
					<ul className="dropdown-menu" style={{ width: "400px" }}>
						<li className="header">You have {count} notifications</li>
						<li>
							<ul className="menu" style={{ minHeight: "40vh", maxHeight: "60vh" }}>
								{listNotify?.map((e, key) => {
									if (e.type === "Like") {
										return <li key={key} onClick={() => onClickNotify(e.post?._id)}>
											<Link to={`/post/${e.post?._id}`} style={{ whiteSpace: "break-spaces" }}>
												<div style={{ display: "flex", alignItems: "center" }}>
													<Avatar src={`${process.env.REACT_APP_SERVER}${e.from?.avatar}`} /> &nbsp;&nbsp;
													<p style={{ wordBreak: "break-all !important" }}><strong>{e?.from?.surName} {e?.from?.firstName}</strong> liked your post.</p>
												</div>
												<i>{moment(e.createAt).fromNow()}</i>
											</Link>
										</li>
									}
									else if (e.type === "Comment") {
										return <li key={key} onClick={() => onClickNotify(e.post?._id)}>
											<Link to={`/post/${e.post?._id}`} style={{ whiteSpace: "break-spaces" }}>
												<div style={{ display: "flex", alignItems: "center" }}>
													<Avatar src={`${process.env.REACT_APP_SERVER}${e.from?.avatar}`} /> &nbsp;&nbsp;
													<p style={{ wordBreak: "break-all !important" }}><strong>{e?.from?.surName} {e?.from?.firstName}</strong> commented in your post.</p>
												</div>
												<i>{moment(e.createAt).fromNow()}</i>
											</Link>
										</li>
									}

								})
								}
								{/* <li>
									<a href="#">
										<i className="fa fa-warning text-yellow" /> Very long description here that may not fit into the
										page and may cause design problems
									</a>
								</li>
								<li>
									<a href="#">
										<i className="fa fa-users text-red" /> 5 new members joined
									</a>
								</li>
								<li>
									<a href="#">
										<i className="fa fa-shopping-cart text-green" /> 25 sales made
									</a>
								</li>
								<li>
									<a href="#">
										<i className="fa fa-user text-red" /> You changed your username
									</a>
								</li> */}
							</ul>
						</li>
						<li className="footer"><a href="#">View all</a></li>
					</ul>
				</li>

			</ul>
		</div>

	);
};

const defaultProps = {
	color: "secondary",
	children: <NotificationsNoneOutlinedIcon />,
};

const mapStateToProps = state => {
	return state;
}

const mapDispatchToProps = {
	getPostById: PostActions.getPostById,
}

export default connect(null, mapDispatchToProps)(withTranslate(Notifications));