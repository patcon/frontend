import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./SearchHit.css";
import { injectIntl, intlShape, FormattedDate } from "react-intl";
import { Row, Col } from "reactstrap";
import backgroundImage from "../../img/pp-thumbnail-1.jpg";
import BookmarkToggle from "../BookmarkToggle";
import ReactPlayer from "react-player";
import htmlToText from "html-to-text";

export class SearchHit extends React.Component {
  getInnerHTML() {
    return { __html: this.props.record.body };
  }
  render() {
    let result = this.props.record;
    let intl = this.props.intl;

    let awsUrl = process.env.REACT_APP_UPLOADS_CDN_URL;
    let pic = result.images && result.images.length
      ? awsUrl + encodeURIComponent(result.images[0])
      : "";
    let video = result.videos ? result.videos[0] : "";
    let id = result.id;
    let type = result.type;
    let title = result.title;
    let body = htmlToText.fromString(result.body).substring(0, 200) + "...";
    let link = `/${type}/${id}`;
    let thumbnailClass = "thumbnail " + type;
    let thumbnailStyle = {
      backgroundImageSrc: backgroundImage
    };
    let bookmarkIcon = (
      <BookmarkToggle
        thingType={result.type}
        thingid={result.id}
        bookmarked={result.bookmarked}
      />
    );
    let blob = (
      <Col xs="12" md={this.props.selectedViewType === "grid" ? "3" : "12"}>
        {this.props.selectedViewType === "grid"
          ? <div className="grid-item">
              <Link to={link} className="result-title">
                {pic
                  ? <div className="case-images">
                      <img alt="" src={pic} />
                    </div>
                 :   
                  video ? 
                    <ReactPlayer
                      width="100%"
                      height="200"
                      controls
                      url={video}
                    />
                  : <div className={thumbnailClass} style={thumbnailStyle} />}
              </Link>
              <small className="label">
                {(result.featured
                  ? intl.formatMessage({ id: "featured" }) + " "
                  : "") + result.type}
              </small>
              {bookmarkIcon}
              <Link to={link} className="result-title">
                <div className="result-title-text">{title}</div>
              </Link>
              <p>{intl.formatMessage({ id: "submitted" })}&nbsp;
                <FormattedDate 
                  value={result.updated_date}
                  year='numeric'
                  month='long'
                  day='2-digit'
                />
              </p>
            </div>
          : <Row className="list-item pt-4">
              <Col md="3">
                {pic
                  ? <Link to={link}>
                      <div className="case-images">
                        <img alt="" src={pic} />
                      </div>
                    </Link>
                  : <Link to={link}>
                      <div className={thumbnailClass} style={thumbnailStyle} />
                    </Link>}
              </Col>
              <Col md="9">
                <small className="label">
                  {(result.featured
                    ? intl.formatMessage({ id: "featured" }) + " "
                    : "") + result.type}
                </small>
                {bookmarkIcon}
                <Link to={link}>
                  <div className="result-title-text">{title}</div>
                </Link>
                <div className="list-body">{body}</div>
                <p>{intl.formatMessage({ id: "submitted" })}&nbsp;
                  <FormattedDate 
                    value={result.updated_date}
                    year='numeric'
                    month='long'
                    day='2-digit'
                  />
                </p>
              </Col>
              <div className="separator" />
            </Row>}
      </Col>
    );
    return blob;
  }
}

SearchHit.propTypes = {
  record: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(SearchHit);
