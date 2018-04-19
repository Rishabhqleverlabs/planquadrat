
<!DOCTYPE HTML>
<html>
<head>
<title>Admin panel</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Modern Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
 <!-- Bootstrap Core CSS -->
<link href="css/bootstrap.min.css" rel='stylesheet' type='text/css' />
<!-- Custom CSS -->
<link href="css/style.css" rel='stylesheet' type='text/css' />
<link href="css/font-awesome.css" rel="stylesheet"> 
<!-- jQuery -->
<script src="js/jquery.min.js"></script>

<script src="js/bootstrap.min.js"></script>
</head>

<?php
session_start();
include("conn.php");
if(isset($_POST['signin']))
{
	$uname = $_POST['admname'];
	$pass = $_POST['admpass'];
	$_SESSION['admin']=$uname;
	//$p = $pass;
	$q = "SELECT * FROM admin WHERE uname='$uname' AND passwd='$pass'";
	$cq = mysqli_query($con,$q);
	$ret = mysqli_num_rows($cq);
	if($ret == true)
	{
		echo '<script>window.location.href = "deleteproject.php";</script>';
	}
	else
	{

	$confirm = "<b style='color:red'>Username and Password do not match</b>";
	}

}
?>


<body id="login">
  <div class="login-logo">
    <a href="index.html"><!-- <img src="images/logo.png" alt=""/> --></a>
  </div>
  <h2 class="form-heading">Admin Login</h2>
  <div class="app-cam">
	  <form method="post" action="index.php">
	  		<?php if(isset($confirm)){ echo $confirm; }?>
		<input type="text" class="text" name="admname" placeholder ="Username">
		<input type="password" name="admpass" placeholder ="Password" >
		<div class="submit"><input type="submit" name="signin" value="Login"></div>
		
		<ul class="new">
			<li class="new_left"><p><a href="#">Forgot Password ?</a></p></li>
			<div class="clearfix"></div>
		</ul>
	</form>
  </div>
</body>
</html>
