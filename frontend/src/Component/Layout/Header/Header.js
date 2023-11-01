import React, { useState, useEffect } from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, logoutUser } from "../../../Actions/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogActions, Button } from "@material-ui/core";
import logo from "../../Images/yt.jpg";
import flag from "../../Images/india.png";

const Header = () => {
  const [profileBox, setProfileBox] = useState("AccountBoxNone");
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuthenticated, user, error } = useSelector((state) => state.user);

  const searchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  let navBar = ["navbar"];


  // Profile box all Funtions

  const handleShow = () => {
    if (profileBox === "AccountBoxNone") {
      setProfileBox("AccountBox");
    } else {
      setProfileBox("AccountBoxNone");
    }
  };
  const dashboard = () => {
    history.push("/admin/dashboard");
  };
  const moveToCart = () => {
    history.push("/cart");
  };
  const account = () => {
    history.push("/account");
  };
  //lOGOUT

  const [open, setOpen] = useState(false);
  const [sopen, setSopen] = useState(false);


  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const searchToggle = () => {
    sopen ? setSopen(false) : setSopen(true);
  };

  const logOut = () => {
    dispatch(logoutUser());

    toast.success("Logout Successfully", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setOpen(false);
    history.push("/");

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearError());
    }
  };

  // Responsive on scroll

  const [nav_scroll, setNav_scroll] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 140) {
      setNav_scroll(true);
    } else {
      setNav_scroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  let scroll_nav = "responsive_nav_scroll_hide";
  if (nav_scroll) {
    scroll_nav = "responsive_nav_scroll";
  }

  // responsive nav ul list 

  const [nav_ul, setNav_ul] = useState("responsive_nav_list")

  const toggleNav_Click = ()=> {
    if(nav_ul === "responsive_nav_list"){
      setNav_ul("responsive_nav_list show_nav")
    }
    else {
      setNav_ul("responsive_nav_list")
    }
  }

  return (
    <>
      <div className={navBar}>
        {/* top nav  */}

        <div className="top_nav">
          {/* left top nav  */}

          <div className="left_top_nav">
            <div className="logo_top_nav">
              <h2>
                Swixi<span>Py</span>
              </h2>
            </div>
            <Link className="text-pink-500" to="/ourStores">
              <i className="fa-solid fa-location-dot px-2"></i> Check Stores
            </Link>
          </div>

          {/* mid top nav  */}
          <div className="mid_top_nav">
            {/* stars nav  */}
            <div className="stars_nav">
              <i className="fa-solid fa-heart text-sky-400"></i>
              <i className="fa-solid fa-heart text-purple-500"></i>
              <i className="fa-solid fa-heart text-pink-500"></i>
            </div>

            <h6>
              "Discover the best clothing sense by and from the not the best but
              finest one's" By SwixiPy
            </h6>

            {/* stars again  */}
            <div className="stars_nav">
              <i className="fa-solid fa-heart text-sky-400"></i>
              <i className="fa-solid fa-heart text-purple-500"></i>
              <i className="fa-solid fa-heart text-pink-500"></i>
            </div>
          </div>

          {/* right top nav  */}
          <div className="right_top_nav">
            <Link className="text-pink-500" to="/me/orders">
              {" "}
              <i class="fa-solid fa-handshake"></i> Your orders
            </Link>
            <Link className="text-pink-500" to="/queries">
              <i className="fa-solid fa-phone"></i> Contact Us
            </Link>
          </div>
        </div>

        {/* mid nav bar  */}
        <nav className="navbar_mid">
          <form className="search-bar" onSubmit={searchSubmit}>
            <input
              type="search"
              name="searchbar"
              placeholder="Search Product"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" value="search">
              {" "}
              <i className="fas fa-search text-pink-500"></i>{" "}
            </button>
          </form>

          <Link to="/" id="logo">
            <h2>
              Swixi <span>PY</span>
            </h2>
          </Link>

          {/* SideIcons  */}

          <div className="sideIcon">
            <Link className="text-pink-500" to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>

            {/* login icon situation */}

            {isAuthenticated && isAuthenticated ? (
              <div className="profile-box" onClickCapture={handleShow}>
                <img src={user.avatar.url} alt="avatar" />
              </div>
            ) : (
              <Link className="text-pink-500" to="/login">
                <i className="fas fa-user"></i> LOGIN
              </Link>
            )}

            <div className="indian_flag">
              <img src={flag} alt="" />
            </div>
          </div>
        </nav>

        {/* mid nav but 700px visible */}

        <nav className="mid_nav_700">

          <div className="logo_search">
            <h2>
              Swixi<span>Py</span>
            </h2>
          </div>

          <div className="responsive_nav_icons ">
            <button onClick={searchToggle} className="search_right_responsive">
              {" "}
              <i className="fas fa-search text-pink-500"></i>{" "}
            </button>
            <Link className="text-pink-500" to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>

            {/* login icon situation */}

            {isAuthenticated && isAuthenticated ? (
              <div className="profile-box" onClickCapture={handleShow}>
                <img src={user.avatar.url} alt="avatar" />
              </div>
            ) : (
              <Link className="text-pink-500" to="/login">
                <i className="fas fa-user"></i> LOGIN
              </Link>
            )}

            <div className="indian_flag responsive_flag">
              <img src={flag} alt="" />
            </div>
          </div>
        </nav>

        {/* main window responsive below drop down options */}
        <div className="below_ul">
          <div>
            <h6 id="collections">
              {" "}
              Collections
              {/* dropdown box  */}
              <div className="dropdown_category">
                <div>
                  <h2>T-Shirts Collections</h2>
                  <Link to="/mensTshirt">Men's T-shirts</Link>
                  <Link to="/womensTshirt">Women's T-shirts</Link>
                  <Link to="/unisexTshirt">Unisex T-shirts</Link>
                  <Link to="/kidsTshirt">Kids T-shirts</Link>
                </div>
                <div>
                  <h2>Shirts Collections</h2>
                  <Link to="/mensShirt">Men's shirts</Link>
                  <Link to="/womensShirt">Women's shirts</Link>
                  <Link to="/unisexShirt">Unisex shirts</Link>
                  <Link to="/kidsShirt">Kids shirts</Link>
                </div>
                <div>
                  <h2>Jeans Collections</h2>
                  <Link to="/mensJeans">Men's jeans</Link>
                  <Link to="/womensJeans">Women's jeans</Link>
                  <Link to="/unisexJeans">Unisex jeans</Link>
                  <Link to="/kidsJeans">Kids jeans</Link>
                </div>
              </div>{" "}
            </h6>

            {/* winter wears */}

            <h6 id="winters">
              Winters Wears
              {/* dropdown box  */}
              <div className="dropdown_winters">
                <div>
                  <h2>MEN'S Collections</h2>
                  <Link to="/mensJackets">Men's Jackets</Link>
                  <Link to="/mensSweaters">Men's Sweaters</Link>
                  <Link to="/menSweatShirts">Men's Sweatshirts</Link>
                </div>
                <div>
                  <h2>Women's Collections</h2>
                  <Link to="/womensJackets">Women's Jackets</Link>
                  <Link to="/womensSweaters">Women's sweaters</Link>
                  <Link to="/womenSweatShirts">Women Sweatshirts</Link>
                </div>
                <div>
                  <h2>Winter Accessories</h2>
                  <Link to="/socks">Men's jeans</Link>
                  <Link to="/scalfs">Scalfs</Link>
                </div>
              </div>
            </h6>

            <h6 id="trending">
              Trending
              {/* dropdown box  */}
              <div className="dropdown_trend">
                <div>
                  <h2>Trendy Fashion </h2>
                  <Link to="/oversizedTshirt">Oversized T-shirts</Link>
                  <Link to="/half_sleeve_shirt">Half Sleeves Shirts</Link>
                  <Link to="/cargo">Cargo jeans</Link>
                  <Link to="/baggy_clothes">Baggy Clothes</Link>
                </div>
              </div>
            </h6>

            {/* summer collections  */}

            <h6 id="summer">
              {" "}
              Summer wears
              {/* dropdown box  */}
              <div className="dropdown_summer">
                <div>
                  <h2>MEN'S Collections</h2>
                  <Link to="/mensShorts">Men's shorts</Link>
                  <Link to="/mensBaggy">Men's Baggy Range</Link>
                </div>
                <div>
                  <h2>Women's Collections</h2>
                  <Link to="/womensShorts">Women's shorts</Link>
                  <Link to="/womensTop">Women's tops</Link>
                  <Link to="/womenKurtis">Women's Kurti</Link>
                </div>
                <div>
                  <h2>Summer Accessories</h2>
                  <Link to="/inCotton">Cottom Range</Link>
                  <Link to="/dryFit">Dry Fits</Link>
                </div>
              </div>
            </h6>

            {/* accesories  */}

            <h6 id="accessories">
              {" "}
              Accessories
              {/* dropdown box  */}
              <div className="dropdown_accesories ">
                <div>
                  <h2>Accesories </h2>
                  <Link to="/glasses">Eye Glasses</Link>
                  <Link to="/bracelletes">Bracelletes</Link>
                  <Link to="/caps">Caps</Link>
                  <Link to="/rings">Rings</Link>
                  <Link to="/jewelleries">Jewelleries</Link>
                </div>
              </div>{" "}
            </h6>

            {/* cosmetics  */}

            <h6 id="cosmetics">
              {" "}
              Cosmetics
              {/* dropdown box  */}
              <div className="dropdown_cosmetics">
                <div>
                  <h2>Beauty Cosmetics </h2>
                  <Link to="/menBeauty">For mens</Link>
                  <Link to="/womenBeauty">For womens</Link>
                </div>
              </div>{" "}
            </h6>
          </div>
        </div>

        {/* Responsive icons tab  */}

        <div className="below_icon">
          <div id="collections" className="below_div_icons">
            <div className="below_ul_image_div">
              <img src={logo} alt="" />
            </div>
            <p>Collections</p>
            {/* dropdown box  */}
            <div className="dropdown_category mobile_top_responsive">
              <div>
                <h2>T-Shirts Collections</h2>
                <Link to="/mensTshirt">Men's T-shirts</Link>
                <Link to="/womensTshirt">Women's T-shirts</Link>
                <Link to="/unisexTshirt">Unisex T-shirts</Link>
                <Link to="/kidsTshirt">Kids T-shirts</Link>
              </div>
              <div>
                <h2>Shirts Collections</h2>
                <Link to="/mensShirt">Men's shirts</Link>
                <Link to="/womensShirt">Women's shirts</Link>
                <Link to="/unisexShirt">Unisex shirts</Link>
                <Link to="/kidsShirt">Kids shirts</Link>
              </div>
              <div>
                <h2>Jeans Collections</h2>
                <Link to="/mensJeans">Men's jeans</Link>
                <Link to="/womensJeans">Women's jeans</Link>
                <Link to="/unisexJeans">Unisex jeans</Link>
                <Link to="/kidsJeans">Kids jeans</Link>
              </div>
            </div>
          </div>

          <div id="winters" className="below_div_icons">
            <div className="below_ul_image_div">
              <img src={logo} alt="" />
            </div>
            <p>Seasonal </p>
            {/* dropdown box  */}
            <div className="dropdown_winters mobile_top_responsive">
              <div>
                <h2>MEN'S Collections</h2>
                <Link to="/mensJackets">Men's Jackets</Link>
                <Link to="/mensSweaters">Men's Sweaters</Link>
                <Link to="/menSweatShirts">Men's Sweatshirts</Link>
                <Link to="/mensShorts">Men's shorts</Link>
                <Link to="/mensBaggy">Men's Baggy Range</Link>
              </div>
              <div>
                <h2>Women's Collections</h2>
                <Link to="/womensJackets">Women's Jackets</Link>
                <Link to="/womensSweaters">Women's sweaters</Link>
                <Link to="/womenSweatShirts">Women Sweatshirts</Link>
                <Link to="/womensShorts">Women's shorts</Link>
                <Link to="/womensTop">Women's tops</Link>
                <Link to="/womenKurtis">Women's Kurti</Link>
              </div>
              <div>
                <h2>Winter Accessories</h2>
                <Link to="/socks">Men's jeans</Link>
                <Link to="/scalfs">Scalfs</Link>
                <Link to="/inCotton">Cottom Range</Link>
                <Link to="/dryFit">Dry Fits</Link>
              </div>
            </div>
          </div>

          <div id="accessories" className="below_div_icons">
            <div className="below_ul_image_div">
              <img src={logo} alt="" />
            </div>
            <p>Accessories </p>
            <div className="dropdown_accesories mobile_top_responsive2">
              <div>
                <h2>Accesories </h2>
                <Link to="/glasses">Eye Glasses</Link>
                <Link to="/bracelletes">Bracelletes</Link>
                <Link to="/caps">Caps</Link>
                <Link to="/rings">Rings</Link>
                <Link to="/jewelleries">Jewelleries</Link>
              </div>
            </div>
          </div>

          <div id="cosmetics" className="below_div_icons">
            <div className="below_ul_image_div">
              <img src={logo} alt="" />
            </div>
            <p>Consmetics </p>
            {/* dropdown box  */}
            <div className="dropdown_cosmetics mobile_top_responsive">
              <div>
                <h2>Beauty Cosmetics </h2>
                <Link to="/menBeauty">For mens</Link>
                <Link to="/womenBeauty">For womens</Link>
              </div>
            </div>
          </div>

          <div id="trending" className="below_div_icons">
            <div className="below_ul_image_div">
              <img src={logo} alt="" />
            </div>
            <p>Trending</p>
            {/* dropdown box  */}
            <div className="dropdown_trend mobile_top_responsive">
              <div>
                <h2>Trendy Fashion </h2>
                <Link to="/oversizedTshirt">Oversized T-shirts</Link>
                <Link to="/half_sleeve_shirt">Half Sleeves Shirts</Link>
                <Link to="/cargo">Cargo jeans</Link>
                <Link to="/baggy_clothes">Baggy Clothes</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Box to show  */}

      {isAuthenticated ? (
        <div className={"AccountBox"}>
        {/* <div className={profileBox}> */}
          {user.role === "admin" ? (
            <div onClick={dashboard}>
              <h3 className="headCart">
                <i className="fas fa-rocket"></i> Dashboard
              </h3>
            </div>
          ) : (
            <div onClick={moveToCart}>
              <h3>
                {" "}
                <i className="fas fa-shopping-cart"></i> Your Cart
              </h3>
            </div>
          )}

          <div onClick={account}>
            {" "}
            <h3>
              {" "}
              <i className="fas fa-user"></i> Your Profile
            </h3>{" "}
          </div>
          <div>
            {" "}
            <h3 onClick={submitReviewToggle}>
              {" "}
              <i className="fas fa-sign-out-alt"></i> Logout
            </h3>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* Dialog box for logout  */}

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <h3
          style={{ color: "orange", padding: "15px 25px", fontWeight: "300" }}
        >
          Lock kiya jayee??
        </h3>

        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            No
          </Button>
          <Button onClick={logOut} className="reviewAddBtn" color="primary">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search bar dialog box  */}

          {/* Dialog box for logout  */}

          <Dialog
        aria-labelledby="simple-dialog-title"
        open={sopen}
        onClose={searchToggle}
      >
           <form className="dialog_search"  onSubmit={searchSubmit}>
            <h2>Search Product</h2>
            <input
              type="search"
              name="searchbar"
              placeholder="Search Product"
              onChange={(e) => setKeyword(e.target.value)}
            />
       

        <DialogActions>
          <Button onClick={searchToggle} color="secondary">
            Exit
          </Button>
          <Button type="submit" value="search" className="reviewAddBtn" color="primary">
          {/* <button type="submit" value="search"> */}
              {" "}
              <i className="fas fa-search text-pink-500"></i>{" "}
            {/* </button> */}
          </Button>
        </DialogActions>
        </form>
      </Dialog>

      {/* Responsive nav on scroll  */}

      <nav className={scroll_nav}>
        <div className="logo_search">
          <button onClick={toggleNav_Click} className="nav_icon_bar">
            {" "}
            <i className="fa-solid fa-bars"></i>{" "}
          </button>
          <h2>
            Swixi<span>Py</span>
          </h2>
          <button onClick={searchToggle} className="nav_icon_search">
            {" "}
            <i className="fas fa-search text-pink-500"></i>{" "}
          </button>
        </div>

        <div className={nav_ul}>
          <h6 id="collections">
            {" "}
            Collections {/* dropdown box  */}
            <div className="dropdown_category responsive_drop">
              <div>
                <h2>T-Shirts Collections</h2>
                <Link to="/mensTshirt">Men's T-shirts</Link>
                <Link to="/womensTshirt">Women's T-shirts</Link>
                <Link to="/unisexTshirt">Unisex T-shirts</Link>
                <Link to="/kidsTshirt">Kids T-shirts</Link>
              </div>
              <div>
                <h2>Shirts Collections</h2>
                <Link to="/mensShirt">Men's shirts</Link>
                <Link to="/womensShirt">Women's shirts</Link>
                <Link to="/unisexShirt">Unisex shirts</Link>
                <Link to="/kidsShirt">Kids shirts</Link>
              </div>
              <div>
                <h2>Jeans Collections</h2>
                <Link to="/mensJeans">Men's jeans</Link>
                <Link to="/womensJeans">Women's jeans</Link>
                <Link to="/unisexJeans">Unisex jeans</Link>
                <Link to="/kidsJeans">Kids jeans</Link>
              </div>
            </div>{" "}
          </h6>

          {/* treding dropdown */}
          <h6 id="trending">
            Trending
            {/* dropdown box  */}
            <div className="dropdown_trend responsive_drop">
              <div>
                <h2>Trendy Fashion </h2>
                <Link to="/oversizedTshirt">Oversized T-shirts</Link>
                <Link to="/half_sleeve_shirt">Half Sleeves Shirts</Link>
                <Link to="/cargo">Cargo jeans</Link>
                <Link to="/baggy_clothes">Baggy Clothes</Link>
              </div>
            </div>
          </h6>

          {/* accesories  */}

          <h6 id="accessories">
            {" "}
            Accessories
            {/* dropdown box  */}
            <div className="dropdown_accesories responsive_drop">
              <div>
                <h2>Accesories </h2>
                <Link to="/glasses">Eye Glasses</Link>
                <Link to="/bracelletes">Bracelletes</Link>
                <Link to="/caps">Caps</Link>
                <Link to="/rings">Rings</Link>
                <Link to="/jewelleries">Jewelleries</Link>
              </div>
            </div>{" "}
          </h6>

          {/* cosmetics  */}

          <h6 id="cosmetics">
            {" "}
            Cosmetics
            {/* dropdown box  */}
            <div className="dropdown_cosmetics responsive_drop">
              <div>
                <h2>Beauty Cosmetics </h2>
                <Link to="/menBeauty">For mens</Link>
                <Link to="/womenBeauty">For womens</Link>
              </div>
            </div>{" "}
          </h6>
        </div>

        <div className="responsive_nav_icons">
          <button onClick={searchToggle} className="search_right_responsive">
            {" "}
            <i className="fas fa-search text-pink-500"></i>{" "}
          </button>
          <Link className="text-pink-500" to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>

          {/* login icon situation */}

          {isAuthenticated && isAuthenticated ? (
            <div className="profile-box" onClickCapture={handleShow}>
              <img src={user.avatar.url} alt="avatar" />
            </div>
          ) : (
            <Link className="text-pink-500" to="/login">
              <i className="fas fa-user"></i> LOGIN
            </Link>
          )}

          <div className="indian_flag responsive_flag">
            <img src={flag} alt="" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
