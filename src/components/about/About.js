import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/SmartBeans_logo_bw.svg';
import Ole from '../../images/Ole.png';
import Johanna from '../../images/Johanna.png';
import Nico from '../../images/Nico.png';
import Niklas from '../../images/Niklas.png';
import Fabian from '../../images/Fabian.png';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeam: true,
      isForschung: false,
      isData: false,
    }
  }

  clickHandler = (index) => {
    let isTeam = false;
    let isForschung = false;
    let isData = false;
    switch (index) {
      case 0:
        isTeam = true;
        break;
      case 1:
        isForschung = true;
        break;
      case 2:
        isData = true;
        break;
      default:
        isTeam = true;
    }
    this.setState({
      isTeam: isTeam,
      isForschung: isForschung,
      isData: isData,
    })
  }

  render() {
    return (
      <div className="tile is-parent is-vertical">
        <div className="tile is-child box" >
          <p style={{ textAlign: "center" }}>
            <img src={logo} width="140" height="140" alt="logo" />
          </p>
          <div className="tabs is-centered is-large">
            <ul>
              <li className={`${this.state.isTeam ? "is-active" : ""}`} onClick={() => this.clickHandler(0)}><a>Unser Team</a></li>
              <li className={`${this.state.isForschung ? "is-active" : ""}`} onClick={() => this.clickHandler(1)}><a>Unsere Forschung</a></li>
              <li className={`${this.state.isData ? "is-active" : ""}`} onClick={() => this.clickHandler(2)}><a>Datenschutzerklärung</a></li>
            </ul>
          </div>
          {this.state.isTeam &&
            <React.Fragment>
              <h1 className="title" style={{ textAlign: "center" }}>
                Das SmartBeans Team
              </h1>
              <p className="mx-5" align="justify">
                Wir wollen kurz uns vorstellen. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nobis, error numquam deleniti, itaque eaque, rem doloribus et laborum id quam iste. Perspiciatis dolorem animi quibusdam harum magnam sequi nulla quae tempora facilis! Quis reiciendis asperiores quos nostrum necessitatibus, veniam non ex voluptates accusamus quisquam placeat explicabo, debitis vel officia illum modi unde eos aliquam assumenda rerum facilis ipsam blanditiis maxime. Nulla nostrum corrupti beatae quidem provident officia a aspernatur repudiandae. Fugit voluptas hic enim voluptate, sapiente distinctio porro dolores nobis illo consequatur, ullam adipisci incidunt, omnis sit consectetur necessitatibus quia minus libero impedit? Blanditiis id dignissimos nam est nobis eveniet dolor saepe commodi, error accusamus magni deserunt ipsam iure sed possimus reiciendis. In ipsam, dignissimos possimus ex similique eos ullam mollitia veniam hic neque minima voluptates, cumque natus, esse quos non maxime quasi impedit saepe sed?
              </p>
            </React.Fragment>
          }
          {this.state.isForschung &&
            <React.Fragment>
              <h1 className="title" style={{ textAlign: "center" }}>
                Forschungsarbeit und Ziele
              </h1>
              <p className="mx-5" align="justify">
                Wir wollen kurz unsere Forschung vorstellen. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nobis, error numquam deleniti, itaque eaque, rem doloribus et laborum id quam iste. Perspiciatis dolorem animi quibusdam harum magnam sequi nulla quae tempora facilis! Quis reiciendis asperiores quos nostrum necessitatibus, veniam non ex voluptates accusamus quisquam placeat explicabo, debitis vel officia illum modi unde eos aliquam assumenda rerum facilis ipsam blanditiis maxime. Nulla nostrum corrupti beatae quidem provident officia a aspernatur repudiandae. Fugit voluptas hic enim voluptate, sapiente distinctio porro dolores nobis illo consequatur, ullam adipisci incidunt, omnis sit consectetur necessitatibus quia minus libero impedit? Blanditiis id dignissimos nam est nobis eveniet dolor saepe commodi, error accusamus magni deserunt ipsam iure sed possimus reiciendis. In ipsam, dignissimos possimus ex similique eos ullam mollitia veniam hic neque minima voluptates, cumque natus, esse quos non maxime quasi impedit saepe sed? Enim praesentium tenetur quidem libero eius quas in, deleniti expedita ipsa, numquam voluptatum neque. Quidem cum quae alias corporis. Natus expedita dolores sed corrupti debitis cupiditate repellendus quidem tempora aliquam rem voluptate aspernatur libero, aliquid voluptates inventore exercitationem dolore eveniet repellat, deserunt neque numquam dicta aut molestiae? Porro numquam harum nihil nesciunt dolorem, ex exercitationem perferendis excepturi error adipisci pariatur ipsum assumenda quidem tempore? Aspernatur fuga culpa non labore molestias sunt aliquid perspiciatis est nisi ratione mollitia qui, et suscipit eligendi, odio, quo expedita blanditiis voluptatem inventore eius molestiae
              </p>
            </React.Fragment>
          }
          {this.state.isData &&
            <React.Fragment>
              <h1 className="title" style={{ textAlign: "center" }}>
                Datenschutzerklärung
              </h1>
              <p className="mx-5" align="justify">
                Wir wollen kurz uns und unsere Forschung vorstellen. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nobis, error numquam deleniti, itaque eaque, rem doloribus et laborum id quam iste. Perspiciatis dolorem animi quibusdam harum magnam sequi nulla quae tempora facilis! Quis reiciendis asperiores quos nostrum necessitatibus, veniam non ex voluptates accusamus quisquam placeat explicabo, debitis vel officia illum modi unde eos aliquam assumenda rerum facilis ipsam blanditiis maxime. Nulla nostrum corrupti beatae quidem provident officia a aspernatur repudiandae. Fugit voluptas hic enim voluptate, sapiente distinctio porro dolores nobis illo consequatur, ullam adipisci incidunt, omnis sit consectetur necessitatibus quia minus libero impedit? Blanditiis id dignissimos nam est nobis eveniet dolor saepe commodi, error accusamus magni deserunt ipsam iure sed possimus reiciendis. In ipsam, dignissimos possimus ex similique eos ullam mollitia veniam hic neque minima voluptates, cumque natus, esse quos non maxime quasi impedit saepe sed? Enim praesentium tenetur quidem libero eius quas in, deleniti expedita ipsa, numquam voluptatum neque. Quidem cum quae alias corporis. Natus expedita dolores sed corrupti debitis cupiditate repellendus quidem tempora aliquam rem voluptate aspernatur libero, aliquid voluptates inventore exercitationem dolore eveniet repellat, deserunt neque numquam dicta aut molestiae? Porro numquam harum nihil nesciunt dolorem, ex exercitationem perferendis excepturi error adipisci pariatur ipsum assumenda quidem tempore? Aspernatur fuga culpa non labore molestias sunt aliquid perspiciatis est nisi ratione mollitia qui, et suscipit eligendi, odio, quo expedita blanditiis voluptatem inventore eius molestiae ipsa vitae accusamus! Deserunt asperiores dolorem at. Quibusdam, dolore obcaecati. Libero voluptatibus, quia, unde dolorem recusandae nihil deserunt vel fugit nesciunt exercitationem debitis facere magnam optio ipsa nulla iure beatae dolore! Ab quo ea adipisci necessitatibus molestias, itaque inventore vel blanditiis laboriosam laborum neque labore provident
              </p>
            </React.Fragment>
          }

          <div style={{ textAlign: "center" }}>
            <img src={Johanna} width="130" height="130" alt="logo" />
            <img src={Niklas} width="130" height="130" alt="logo" />
            <img src={Fabian} width="160" height="160" alt="logo" />
            <img src={Ole} width="130" height="130" alt="logo" />
            <img src={Nico} width="130" height="130" alt="logo" />
          </div>
        </div>
      </div >
    )
  }
}


About.propTypes = {
};
