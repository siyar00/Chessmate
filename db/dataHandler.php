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
        $message = array(
            "error" => true,
            "meesage" => ""
        );

        if (empty($userName)) {
            $message["error"] = false;
            $message["message"] = 'Bitte einen Benutzernamen einfüllen!';
            return $message;
        } 
        if (empty($passWord)) {
            $message["error"] = false;
            $message["message"] = 'Bitte ein Passwort einfüllen!';
            return $message;
        }

        $query = "SELECT username, password, Fen FROM users WHERE username = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $userName, PDO::PARAM_STR);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row == null){
            $message["error"] = false;
            $message["message"] = 'Benutzername nicht vorhanden!';
            return $message;
        }
        extract($row);
        $pwdCheck = password_verify($passWord, $password);
        if(!$pwdCheck){
            $message["error"] = false;
            $message["message"] = 'Passwort falsch!';
            return $message;
        };
        $message["message"] = $Fen;
        return $message;    
    }

    public function signup($data){
        $username = $this->input($data["username"]);
        $password = $this->input($data["password"]);
        $fen =  $this->input($data["Fen"]);
        $message = array(
            "error" => true,
            "meesage" => ""
        );

        if (empty($username)) {
            $message["error"] = false;
            $message["message"] = 'Bitte einen Benutzernamen einfüllen!';
            return $message;
        } else if (!preg_match('/^[a-zA-z0-9\s]+$/', $username)) {
            $message["error"] = false;
            $message["message"] = 'Bitte einen gültigen Benutzernamen einfüllen!';
            return $message;
        }
        if (empty($password)) {
            $message["error"] = false;
            $message["message"] = 'Bitte ein Passwort einfüllen!';
            return $message;
        } else if (!preg_match('/([\w\d]){6,}\w+\d+/', $password)) { //
            $message["error"] = false;
            $message["message"] = 'Mind. 8 Zeichen, 1 Zahl, 1 Buchstabe!';
            return $message;
        }

        $query = "SELECT username FROM users WHERE username = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $username, PDO::PARAM_STR);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row != null){
            $message["error"] = false;
            $message["message"] = "Benutzername schon vergeben";
            return $message;
        }

        $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO users(username, password, Fen) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $username , PDO::PARAM_STR);
        $stmt->bindParam(2, $hashedPwd, PDO::PARAM_STR);
        $stmt->bindParam(3, $fen, PDO::PARAM_STR);
        $stmt->execute();

        $message["message"] = 'SignUp Successfull';
        return $message;
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