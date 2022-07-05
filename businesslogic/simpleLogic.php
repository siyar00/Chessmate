<?php
include "db/dataHandler.php";
include "config/Dbs.php";

class SimpleLogic
{
    private $dh;
    private $dbs;
    function __construct()
    {
        $dbs = new Dbs;
        $this->dh = new DataHandler($dbs->connect());
    }

    function handleRequest($method, $daten)
    {
        switch ($method) {
            case "login":
                $res = $this->dh->login($daten);
                break;
            case "signup":
                $res = $this->dh->signup($daten);
                break;
            case "update":
                $res = $this->dh->updateFen($daten);
                break;  
            default:
                $res = null;
                $this->dbs->close();
                break;
        }
        return $res;
    }
}
