<?php

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) 
    {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
    {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        {
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        }
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        {
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
    
        exit(0);
    }

    $ServerHostName = 'localhost';
    $ServerUserName = 'root';
    $ServerUserPassword = 'password';
    $ServerUserDatabaseName = 'pressure_pals';

    
    // For Login
    if (isset($_POST['login-email']) && isset($_POST['login-password'])) 
    {
        $email = $_POST['login-email'];
        $client_password = $_POST['login-password'];

        check_user_login($email, $client_password, $ServerHostName, $ServerUserName, $ServerUserPassword, $ServerUserDatabaseName);
    }

    // For Create Account
    if (
        isset($_POST['name']) && 
        isset($_POST['email']) &&
        isset($_POST['cell-number']) && 
        isset($_POST['password'])
    ){
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $cellNumber = $_POST['cell-number'];
        $client_password = $_POST['password'];
        $address = $_POST['address'];
        $suburb = $_POST['suburb'];

        add_user($name, $surname, $email, $cellNumber, $client_password, $address, $suburb, $ServerHostName, $ServerUserName, $ServerUserPassword, $ServerUserDatabaseName);
    }

    // For fetching pending requests for Admin
    if (isset($_POST['admin-pending-requests']))
    {
        $host = $ServerHostName;
        $username = $ServerUserName;
        $password = $ServerUserPassword;
        $dbname = $ServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $final_array_send = [];

        $query = "SELECT * FROM pressure_pals_booking";

        $result = mysqli_query($conn, $query);
    
        while ($row = mysqli_fetch_array($result))
        {
            if ($row['action_level'] == 'pending')
            {
                $fetch_array = [];

                array_push($fetch_array, $row['booking_id']);
                array_push($fetch_array, $row['service_type']);
                array_push($fetch_array, $row['date_time']);
                array_push($fetch_array, $row['booking_address']);
                array_push($fetch_array, $row['suburb']);
                array_push($fetch_array, $row['client_id']);

                $client_id_fetch = $row['client_id'];

                $query_two = "SELECT * FROM pressure_pal_client WHERE client_id = $client_id_fetch";

                $result_two = mysqli_query($conn, $query_two);

                $row2 = mysqli_fetch_array($result_two);

                array_push($fetch_array, $row2['client_name']);
                array_push($fetch_array, $row2['client_surname']);
                array_push($fetch_array, $row2['phone_number']);

                array_push($final_array_send, $fetch_array);
            }
        }

        echo json_encode($final_array_send);

        mysqli_close($conn);

        return;
    }

    // For response action for pending requests
    if (isset($_POST['admin-action-response-requests-id']) && isset($_POST['admin-action-response-requests-type'])) 
    {
        $booking_response_id = $_POST['admin-action-response-requests-id'];
        $booking_response_type = $_POST['admin-action-response-requests-type'];
      
        $host = $ServerHostName;
        $username = $ServerUserName;
        $password = $ServerUserPassword;
        $dbname = $ServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $sql = "UPDATE pressure_pals_booking SET action_level = '$booking_response_type' WHERE booking_id = $booking_response_id";

        if (mysqli_query($conn, $sql)) {
            echo json_encode("Action was successfully.");
        } else {
            echo json_encode("Action did not process.");
        }

        mysqli_close($conn);

        return;
    }

    // For User Booking Retrieval dates
    if (isset($_POST['user-id-bookings-requests'])) 
    {
        $user_id = $_POST['user-id-bookings-requests'];
        $final_array_all_user_bookings = [];

        $host = $ServerHostName;
        $username = $ServerUserName;
        $password = $ServerUserPassword;
        $dbname = $ServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $sql = "SELECT * FROM pressure_pals_booking WHERE client_id = $user_id";

        $result = mysqli_query($conn, $sql);

        while ($row = mysqli_fetch_array($result))
        {
            $fetch_array = [];

            array_push($fetch_array, $row['date_time']);
            array_push($fetch_array, $row['action_level']);

            array_push($final_array_all_user_bookings, $fetch_array);
        }

        echo json_encode($final_array_all_user_bookings);

        mysqli_close($conn);

        return;
    }

    // For Admin bookings Retrieval data
    if (isset($_POST['admin-booking-request']))
    {
        $host = $ServerHostName;
        $username = $ServerUserName;
        $password = $ServerUserPassword;
        $dbname = $ServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $array_values_to_send = [];

        // Get the Week before the current date
        $dayBefore = date('Y-m-d 00:00:00', strtotime('-7 day'));

        $query = "SELECT * FROM pressure_pals_booking WHERE action_level = 'accept' AND date_time >= '$dayBefore' ORDER BY date_time DESC";

        $result = mysqli_query($conn, $query);
    
        while ($row = mysqli_fetch_array($result))
        {

            $fetch_array = [];

            array_push($fetch_array, $row['date_time']);
            array_push($fetch_array, $row['booking_address']);
            array_push($fetch_array, $row['suburb']);
            array_push($fetch_array, $row['service_type']);

            $client_id_fetch = $row['client_id'];

            $query_two = "SELECT * FROM pressure_pal_client WHERE client_id = $client_id_fetch";

            $result_two = mysqli_query($conn, $query_two);

            $row2 = mysqli_fetch_array($result_two);

            array_push($fetch_array, $row2['client_name']);
            array_push($fetch_array, $row2['client_surname']);
            array_push($fetch_array, $row2['phone_number']);

            array_push($array_values_to_send, $fetch_array);
            
        }

        echo json_encode($array_values_to_send);

        mysqli_close($conn);

        return;
    }
    
    // For User book Day
    if (
        isset($_POST['book-date-user-id']) &&
        isset($_POST['book-date-date']) && 
        isset($_POST['book-date-address']) &&
        isset($_POST['book-date-suburb']) &&
        isset($_POST['book-date-service']) &&
        isset($_POST['book-date-action-level'])
    )
    {
        $userId = $_POST['book-date-user-id'];
        $date = $_POST['book-date-date'];
        $address = $_POST['book-date-address'];
        $suburb = $_POST['book-date-suburb'];
        $service = $_POST['book-date-service'];
        $actionLevel = $_POST['book-date-action-level'];

        $host = $ServerHostName;
        $username = $ServerUserName;
        $password = $ServerUserPassword;
        $dbname = $ServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $duplicateCheck = "SELECT date_time FROM pressure_pals_booking WHERE date_time = '$date' AND (action_level = 'accept' OR action_level = 'pending')";

        $result = mysqli_query($conn, $duplicateCheck);

        $duplicateDateCheck = mysqli_fetch_array($result);

        if ($duplicateDateCheck != null)
        {
            echo json_encode("Not Available");
            mysqli_close($conn);

            return;
        }

        $sql = "INSERT INTO pressure_pals_booking (service_type, date_time, action_level, booking_address, suburb, client_id) VALUES (?, ?, ?, ?, ?, ?)";
        
        $stmt = mysqli_stmt_init($conn);

        if (!mysqli_stmt_prepare($stmt, $sql)){
            die(mysqli_error($conn));
        }

        mysqli_stmt_bind_param($stmt, 'ssssss', $service, $date, $actionLevel, $address, $suburb, $userId);

        mysqli_stmt_execute($stmt);

        echo json_encode('Successful');

        mysqli_close($conn);

        return;
    }

    // For fetching booked dates that are accepted and pending
    if (isset($_POST['fetch-booked-dates-status']))
    {
        $host = $ServerHostName;
        $username = $ServerUserName;
        $password = $ServerUserPassword;
        $dbname = $ServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $sql = "SELECT date_time FROM pressure_pals_booking WHERE action_level = 'accept' OR action_level = 'pending'";

        $result = mysqli_query($conn, $sql);

        $date_array = [];

        while ($row = mysqli_fetch_array($result))
        {
            array_push($date_array, $row['date_time']);
        }

        echo json_encode($date_array);

        mysqli_close($conn);

        return;
    }

    // For already Logged In
    if (isset($_POST['onload-login-id']))
    {
        $client_id_onload = $_POST['onload-login-id'];
      
        $host = $ServerHostName;
        $username = $ServerUserName;
        $password = $ServerUserPassword;
        $dbname = $ServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $sql = "SELECT access_level FROM pressure_pal_client WHERE client_id = $client_id_onload";

        $result = mysqli_query($conn, $sql);

        echo json_encode($row = mysqli_fetch_array($result));

        mysqli_close($conn);

        return;
    }

    // For Delete Account
    if (isset($_POST['delete-account-user-id'])){
        $client_id_delete = $_POST['delete-account-user-id'];

        $host = $ServerHostName;
        $username = $ServerUserName;
        $password = $ServerUserPassword;
        $dbname = $ServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $sql = "DELETE FROM pressure_pal_client WHERE client_id = $client_id_delete";

       if (mysqli_query($conn, $sql)) {
        echo json_encode("Record deleted");
       } else {
        echo json_encode("Error deleting record");
       }

        mysqli_close($conn);

        return;
    }

    function check_user_login($email, $client_password, $PassServerHostName, $PassServerUsername, $PassServerPassword, $PassServerUserDatabaseName)
    {
        $isUser = false;

        $host = $PassServerHostName;
        $username = $PassServerUsername;
        $password = $PassServerPassword;
        $dbname = $PassServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);
    
        if (mysqli_connect_errno())
        {
            die("Connection error: " . mysqli_connect_errno());
        } 

        $sql = "SELECT * FROM pressure_pal_client";
    
        $result = mysqli_query($conn, $sql);
    
        while ($row = mysqli_fetch_array($result)){
            if ($email == $row['email'] && $client_password == $row['client_password']){
                $isUser = true;

                $userDetails = array($row['access_level'], $row['client_id'], $row['address'], $row['suburb']);
                echo json_encode($userDetails);
    
                return;
            }
        }
    
        if(!$isUser){
            echo json_encode("no user");
        }
    
        mysqli_close($conn);

        return;
    }

    function add_user($name, $surname, $email, $cellNumber, $client_password, $address, $suburb, $PassServerHostName, $PassServerUsername, $PassServerPassword, $PassServerUserDatabaseName){
     
        $host = $PassServerHostName;
        $username = $PassServerUsername;
        $password = $PassServerPassword;
        $dbname = $PassServerUserDatabaseName;
    
        $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname);

        $rowCount = 0;
    
        if (mysqli_connect_errno()){
            die("Connection error: " . mysqli_connect_errno());
        } 

        $sql2 = "SELECT * FROM pressure_pal_client";

       
        if ($result = mysqli_query($conn, $sql2)) {
            $rowCount = mysqli_num_rows($result);
        }

        // If user count is less than 7 it will add user
        if ($rowCount < 7){

            mysqli_begin_transaction($conn);
            try {

                $sql = "INSERT INTO pressure_pal_client (client_name, client_surname, email, phone_number, client_password, address, suburb) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
                $stmt = mysqli_stmt_init($conn);
        
                if (!mysqli_stmt_prepare($stmt, $sql)){
                    die(mysqli_error($conn));
                }
        
                mysqli_stmt_bind_param($stmt, 'sssssss', $name, $surname, $email, $cellNumber, $client_password, $address, $suburb);
        
                mysqli_stmt_execute($stmt);

                mysqli_commit($conn);
            } catch (\Throwable $e){
                mysqli_rollback($conn);
                echo json_encode('failed');
                return;
            }
    
    
            $sqlSelect = "SELECT * FROM pressure_pal_client";
    
            $result = mysqli_query($conn, $sqlSelect);
    
            while ($row = mysqli_fetch_array($result)){
                if ($email == $row['email'] && $client_password == $row['client_password']){
                    echo json_encode($row['client_id']);
        
                    return;
                }
            }
    
        } else {
            
            echo json_encode('full');
        }
        
        mysqli_close($conn);
        return;
    }

?>