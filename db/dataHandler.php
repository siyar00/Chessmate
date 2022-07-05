<?php
class DataHandler
{
    private $conn;

    public function __construct($dbs)
    {
        $this->conn = $dbs;
    }

    private function input($input)
    {
        return htmlspecialchars($input);
    }

    public function login($data){
        $userName = $this->input($data["username"]);
        $passWord = $this->input($data["password"]);

        $query = "SELECT username, password, Fen FROM users WHERE username = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $userName, PDO::PARAM_STR);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row == null) return "Benutzername nicht vorhanden!";
        extract($row);
        $pwdCheck = password_verify($passWord, $password);
        if(!$pwdCheck) return "Passwort falsch!";
        return $Fen;
    }

    public function signup($data){
        $username = $this->input($data["username"]);
        $password = $this->input($data["password"]);
        $fen =  $this->input($data["Fen"]);

        $query = "SELECT username FROM users WHERE username = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $username, PDO::PARAM_STR);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row != null) return "Benutzername schon vergeben";

        $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO users(username, password, Fen) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $username , PDO::PARAM_STR);
        $stmt->bindParam(2, $hashedPwd, PDO::PARAM_STR);
        $stmt->bindParam(3, $fen, PDO::PARAM_STR);
        $stmt->execute();

        return "Sign-Up successfully";
    }

    public function updateFen($data){
        $username = $this->input($data["username"]);
        $fen =  $this->input($data["fen"]);

        $query = "UPDATE users SET Fen = ? WHERE username = ?;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $fen, PDO::PARAM_STR);
        $stmt->bindParam(2, $username, PDO::PARAM_STR);
        $stmt->execute();

        return "Success";
    }
}
