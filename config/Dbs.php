<?php
class Dbs{
  private $host = "localhost";    
  private $username = "admin";
  private $password = "";
  private $dbName = "chessmate";
  private $conn;

    public function connect(){
        $this->conn = null;
        try{
            $this->conn = new PDO('mysql:host='. $this->host .
            ';dbname='. $this->dbName, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e){
            echo "Connection Error: " .$e->getMessage();
            die();
        }
        return $this->conn;
    }
}
