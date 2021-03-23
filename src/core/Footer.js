const Footer = () => {
  return (
    <div>
      <footer className="footer text-center text-white bg-secondary py-5 mt-5">
        <div className="container">
          <div className="row">

            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">Location</h4>
              <p className="lead mb-0">
                131 Dudley St
                        <br />
                        Jersey City, NJ 07302
                    </p>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">Thank You!</h4>
              <a className="btn btn-outline-light btn-social mx-1" href="https://github.com/Starlla">
                <i className="fab fa-fw fa-github"></i></a>
              <a className="btn btn-outline-light btn-social mx-1" href="https://www.instagram.com/cyoii/"><i
                className="fab fa-fw fa-instagram"></i></a>
              <a className="btn btn-outline-light btn-social mx-1" href="https://www.linkedin.com/in/chuyutong/"><i
                className="fab fa-fw fa-linkedin-in"></i></a>
              <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-dribbble"></i></a>
            </div>
            <hr className="" />
            <div className="col-lg-4">
              <h4 className="text-uppercase mb-4">Email</h4>
              <p className="lead mb-0">
                claire.cy.tong@gmail.com
              </p>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright py-4 text-center text-white bg-secondary">
        <div className="container">
          <div className="row copyright-title">
            <div className="ml-auto">
              <small>Copyright © Chuyu Tong 2021</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer