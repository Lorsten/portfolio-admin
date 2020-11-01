<?php
// Start the session

//Create variables for the address
$urlLocal= "http://localhost/portfolio_api/index.php/";
$url = "http://studenter.miun.se/~olan1700/dt057g/portfolio/server/index.php/Authenticate";
$urlhome= " http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/admin.php";
session_start();
if(isset($_SESSION['user'])){
  Header('location: http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/admin.php');
}
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>AdminLogin</title>
  </head>
  <body>
    <div class="container mt-5" id="loginform">
    <h1>Welcome, login to continue!</h1>
        <div class="row">
            <div class="col-8">
    <form id="login" method="post" action="">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" class="form-control" id="username" name="username">
  
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" name="password">
        </div>
        <button type="submit" name="login" id="login-button" class="btn btn-primary">Logga in</button>
      </form>
    </div>
    </div>
    </div>
    <?php
if(isset($_POST['username']) && isset($_POST['password'])){

// place the data into an array

$data = array('username' => $_POST['username'], "password" => $_POST['password']);

$options = array(
    'http' => array(
        'header' => "Content-Type:application/json",
        'method' => "POST",
        'content' => json_encode($data)
    )
  
    );
    // Using curl to make and HTTP request to the authenticate route
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    // response failed
    if($result === FALSE) {echo "<div class='container bg-danger p-3 mt-5' id='messageBox'><h3>Wrong username or password</h3></div>";}

    //If successed create a session andredirect user to admin page

    else{
        $_SESSION["user"] = "Admin";
        Header('location: http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/admin.php');
    }
}
?>
    <div class="container bg-danger p-3 mt-5 d-none " id="message">
    </div>
  <!-- Grid column -->
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="js/main.js"></script>
  </body>
</html>