const Footer = () => {
  return (
    <div>
      <footer class="footer text-center text-white bg-secondary py-5 mt-5">
        <div class="container">
          <div class="row">

            <div class="col-lg-4 mb-5 mb-lg-0">
              <h4 class="text-uppercase mb-4">Location</h4>
              <p class="lead mb-0">
                131 Dudley St
                        <br />
                        Jersey City, NJ 07302
                    </p>
            </div>

            <div class="col-lg-4 mb-5 mb-lg-0">
              <h4 class="text-uppercase mb-4">Thank You!</h4>
              <a class="btn btn-outline-light btn-social mx-1" href="https://github.com/Starlla">
                <i class="fab fa-fw fa-github"></i></a>
              <a class="btn btn-outline-light btn-social mx-1" href="https://www.instagram.com/cyoii/"><i
                class="fab fa-fw fa-instagram"></i></a>
              <a class="btn btn-outline-light btn-social mx-1" href="https://www.linkedin.com/in/chuyutong/"><i
                class="fab fa-fw fa-linkedin-in"></i></a>
              <a class="btn btn-outline-light btn-social mx-1" href="#!"><i class="fab fa-fw fa-dribbble"></i></a>
            </div>
            <hr className="" />
            <div class="col-lg-4">
              <h4 class="text-uppercase mb-4">Email</h4>
              <p class="lead mb-0">
                claire.cy.tong@gmail.com
              </p>
            </div>
          </div>
        </div>
      </footer>

      <div class="copyright py-4 text-center text-white bg-secondary">
        <div class="container">
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