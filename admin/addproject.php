<?php
session_start();
include('conn.php');
if($_SESSION['admin']=="")
{
    header('location:index.php');
}



if( isset($_REQUEST['id']) )
   {
   
       $id=$_REQUEST['id'];
       $q=" SELECT * FROM project WHERE `id`='$id' ";
       
       $sql=mysqli_query($con,$q);

       $fetch=mysqli_fetch_assoc($sql);


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
include('conn.php');
$confirm7='';
if(isset($_POST["Save"])){
$blogtitle = $_POST["blogtitle"];
$dates = $_POST['dates'];
$headertext = $_POST['headertext'];
$bodytext = $_POST['bodytext'];
$contractor = $_POST['contractor'];
$projecttype = $_POST['projecttype'];

if(isset($_POST['relatedprojects'])){ 
  $getInput = $_POST['relatedprojects']; 
  $selectedOption = "";
  foreach ($getInput as $option => $value) {
    $selectedOption .= $value.'+'; 
  }
  }  //php code for multiple images uploads -----start
      $targetFolder = "../admin/assets/img/blogimg/";
    $errorMsg = array();
    $successMsg = array();
    $oldfilename = "";
    foreach($_FILES as $file => $fileArray)
    {
      
      if(!empty($fileArray['name']) && $fileArray['error'] == 0)
      {
        $getFileExtension = pathinfo($fileArray['name'], PATHINFO_EXTENSION);;

        if(($getFileExtension =='jpg') || ($getFileExtension =='jpeg') || ($getFileExtension =='png') || ($getFileExtension =='gif'))
        {
          if ($fileArray["size"] <= 5500000) 
          {
            $breakImgName = explode(".",$fileArray['name']);
            $imageOldNameWithOutExt = $breakImgName[0];
            $imageOldExt = $breakImgName[1];

            $newFileName = strtotime("now")."-".str_replace(" ","-",strtolower($imageOldNameWithOutExt)).".".$imageOldExt;

            
            $targetPath = $targetFolder."/".$newFileName;
            $oldfilename= $oldfilename." ".$newFileName;
            
            if (move_uploaded_file($fileArray["tmp_name"], $targetPath)) 
            {
              
              $errorMsg[$file] = "image uploaded successfully";
            }
            else
            {
              $errorMsg[$file] = "Unable to save ".$file." file ";    
            }
          } 
          else
          {
            $errorMsg[$file] = "Image size is too large in ".$file;
          }

        }
        else
        {
          $errorMsg[$file] = 'Only image file required in '.$file.' position';
        } 
      }
      
    }
   /* $qry ="insert into project (images) values ('".$oldfilename."')";


              $rs  = mysqli_query($con, $qry);

              if($rs)
              {
                $successMsg[$file] = "Image is uploaded successfully";
              }
              else
              {
                $errorMsg[$file] = "Unable to save ".$file." file ";
              }*/
    //multiple images uploads -----end
    


include('conn.php');
//$sql = "INSERT INTO project(blogtitle, dates, headertext, bodytext) VALUES ('$blogtitle','$dates', '$headertext', '$bodytext')";
$sql = "INSERT INTO project(blogtitle, dates,images, headertext, bodytext, contractor, projecttype, relatedprojects) VALUES ('$blogtitle','$dates','$oldfilename', '$headertext', '$bodytext', '$contractor', '$projecttype', '$selectedOption')";
$sq = mysqli_query($con,$sql);
//header('location:addfaculty.php');
if($sq){
  $confirm7 = "Successfully Entered";
  header('location:deleteproject.php');
}else
{
  $confirm7 = "Error";
}
}
  


?>





<div id="wrapper">
    <?php include 'side_menu.html' ?> 

       <div id="page-wrapper">
        <div class="graphs">
        <div class="xs">
            <h3>Add project</h3>
                <div class="tab-content">
            <div class="tab-pane active" id="horizontal-form">              
              <form class="form-horizontal" method="POST" action="addproject.php" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="focusedinput" class="col-sm-2 control-label">blogtitle</label>
                    <div class="col-sm-8">
                      <input type="text" value="<?php if(isset($fetch['blogtitle'])&& $fetch['blogtitle'] !=""){ echo $fetch['blogtitle']; } ?>"  class="form-control1" name="blogtitle" id="blogtitle" placeholder="">
                    </div>
                  </div> 
              
              
              <!--    <div class="form-group">
                    <label for="focusedinput" class="col-sm-2 control-label">headertext</label>
                    <div class="col-sm-8">
                      <input type="text" value="<?php if(isset($fetch['headertext'])&& $fetch['headertext'] !=""){ echo $fetch['headertext']; } ?>"   class="form-control1" name="headertext" id="headertext" placeholder="">
                    </div>
                  </div> -->

                  

                <div class="form-group">
                    <label for="focusedinput" class="col-sm-2 control-label">Header Text</label>
                    <div class="col-sm-8">
                      <input type="text" value="<?php if(isset($fetch['bodytext'])&& $fetch['bodytext'] !=""){ echo $fetch['bodytext']; } ?>"   class="form-control1" name="bodytext" id="bodytext" placeholder="">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="focusedinput" class="col-sm-2 control-label">Body Text</label>
                    <div class="col-sm-8">
                       <textarea class="content" name="headertext" id="headertext"></textarea>
                    </div>
                  </div>

                   <div class="form-group">
                    <label for="focusedinput" class="col-sm-2 control-label">Options</label>
                    <div class="col-sm-8">
                      <input type="text" value="<?php if(isset($fetch['contractor'])&& $fetch['contractor'] !=""){ echo $fetch['contractor']; } ?>"   class="form-control1" name="contractor" id="contractor" placeholder=" example: Option : vlaue + Option : value ">Note: use + to add more options in the above format;
                    </div>
                  </div>
                   <div class="form-group">
                    <label for="focusedinput" class="col-sm-2 control-label">Project Type</label>
                    <div class="col-sm-8">
                      <input type="text" value="<?php if(isset($fetch['projecttype'])&& $fetch['projecttype'] !=""){ echo $fetch['projecttype']; } ?>"   class="form-control1" name="projecttype" id="projecttype" placeholder="">
                    </div>
                  </div>
                <div class="form-group">
                    <label for="focusedinput" class="col-sm-2 control-label">dates</label>
                    <div class="col-sm-8">
                      <input type="date" value="<?php if(isset($fetch['dates'])&& $fetch['dates'] !=""){ echo $fetch['dates']; } ?>"   class="form-control1" name="dates" id="dates" placeholder="dd-mm-yyyy">
                    </div>
                  </div>
                 
                  <div class="input-files" style="margin-left: 17%;">
      <div class="add-more-cont"><a id="moreImg"><img src="img/add_icon.jpg">More Images</a></div>
    <input type="file" name="image_upload-1">
    </div>
    <?php include('conn.php');
      $sqloption= "SELECT * FROM project";
      $sqlioption = mysqli_query($con,$sqloption);

     ?>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.jquery.min.js"></script>
<link href="https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.min.css" rel="stylesheet"/>

       <p style="margin-left: 4%;">  Related Proejcts:   <select data-placeholder="Begin typing a name to filter..." multiple class="chosen-select" name="relatedprojects[]"  id="relatedprojects">
                            <?php
                       while($r=mysqli_fetch_array($sqlioption))
                       {
                      ?>
                      <option value="<?php echo $r['blogtitle']; ?>"> <?php echo $r['blogtitle'];?> </option>                 
                      <?php
                      }
                      ?></p>
          </select> 

        


  
  


                <!--  <div class="form-group">
                        <label for="exampleInputFile"  class="col-sm-2 control-label">Upload Image</label>
                        <div class="col-sm-8">
                        <input type="file" name="fimage">
                      </div>
                    </div>-->
                  <div class="row">
                  <div class="col-sm-4 col-sm-offset-2">
                    <input type="submit"  value="Save" name="Save" class="btn-success btn">
                    <?php echo $confirm7; ?>
                  </div>
                  <!--<div>
                    <input type="text" value="update" name="update">
                  </div>-->
                  
                </div>
                
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

<link href="css/custom.css" rel="stylesheet">
<script src="js/metisMenu.min.js"></script>
<script type="text/javascript">
  $(".chosen-select").chosen({
  no_results_text: "Oops, nothing found!"
})
  </script>
<script src="js/custom.js"></script>
<script src="https://cloud.tinymce.com/stable/tinymce.min.js"></script>
  <script>tinymce.init({ selector:'.content' });</script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script>
    $(document).ready(function(){
      var id = 1;
      $("#moreImg").click(function(){
        var showId = ++id;
        if(showId <=10)
        {
          $(".input-files").append('<input type="file" name="image_upload-'+showId+'">');
        }
      });
    });
  </script>
</body>
</html>
