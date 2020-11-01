<?php 
//Using current url and the url adresses in the array to change the class to active
$current_page = $_SERVER['REQUEST_URI'];
$pages = array('http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/admin.php','http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/add.php' );

?>
            <div class="col bg-secondary mb-5">
                <ul class="nav mt-5 list-unstyled p-2">
                  
                    <li><a class="<?php echo ($current_page == $pages[0]) ? "nav-link text-info active" :  "nav-link text-white";?>" href="http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/admin.php">Home</a> </li>
                    <li><a class="<?php echo ($current_page == $pages[1]) ? "nav-link text-info active" : "nav-link text-white";?>" href="http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/add.php">Add data</a> </li>
                    <li><a class="nav-link text-white" href="http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/logout.php" id="logout">Logout</a> </li>
                </ul>
            
            </div>
