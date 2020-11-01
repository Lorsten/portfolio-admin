<?php
// Start the session
session_start();
$url = "http://studenter.miun.se/~olan1700/dt057g/portfolio/admin";
if (!isset($_SESSION['user'])) {
    Header('location:'.$url.'');
}