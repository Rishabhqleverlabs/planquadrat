<?php
session_start();
if($_SESSION['admin']=="")
{
    header('location:index.php');
}

?>
<!DOCTYPE HTML>
<html>
<head>
<title>Admin Panel</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

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
<body>
  <?php
   if( isset($_REQUEST['id']) )
   {
       $idd=$_REQUEST['id'];
       $q=" DELETE FROM `project` WHERE `id`='$idd' ";
       $sql=mysqli_query($con,$q);
       if($sql)
       {
        echo "<script> alert('data deleted'); </script>";
       }
   }
?>
<div id="wrapper">
     <!-- Navigation -->
       <?php include 'side_menu.html'; ?>
        <div id="page-wrapper">
        <div class="col-md-12 graphs">
	   <div class="xs">
  	 <h3>List Of All Projects</h3>
  
        <div class="panel panel-warning" data-widget="{&quot;draggable&quot;: &quot;false&quot;}" data-widget-static="">
        <div class="panel-body no-padding">
          <table class="table table-striped">
            <thead>

              <tr class="warning">
                <th>Id</th>
                <th>Blog Title</th>
                <th>Header Text</th>
                 <th>Body Text</th>
                 <th>date</th>
                 <th>image</th>
                 <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <?php
                include('conn.php');
                $sqlp= "SELECT * FROM project";
             
                $vals = mysqli_query($con,$sqlp);
                $i = 0;    
                while($row = mysqli_fetch_assoc($vals)) {
                  
                $image = "../assets/img/blogimg/".$row['images'];
                $i++
              ?>


              <tr>
                <td><?php echo $i ?></td>
                <td><?php echo $row['blogtitle']; ?></td>
                <td><?php echo $row['headertext']; ?></td>
                <td><?php echo $row['bodytext']; ?></td>
                <td><?php echo $row['dates']; ?></td>

                 <td><img src="<?php echo $image; ?>" alt="error" height="60px" width="70px"/> </td>
              </tr>
                
                <td><a href="display.php?id=<?php echo $row['id']; ?>">
                  <input type="button" value="delete" name="delete" class="btn-success btn"></a></td>
                   </tr>
              <?php } ?>
             
            </tbody>
          </table>
        </div>
  </div>

  </div>
  </div>
 
   </div>
      </div>
 
   </div>

<link href="css/custom.css" rel="stylesheet">
<script src="js/metisMenu.min.js"></script>
<script src="js/custom.js"></script>
</body>
</html>
