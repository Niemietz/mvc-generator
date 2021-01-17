<?php

class DAO
{
	/* PRODUÇÃO */

	/* LOCAL */
	private static $host = 'localhost';
	private static $user = 'root';
	private static $password = 'root';
	private static $db = 'db_mvc_generator';
	
	private static $dbcon;

	// ----- MAKE IT SINGLETON -----

  	/*private static $instance;

    private function __construct()
    {
		self::startConnection();
    }

    public static function getInstance()
	{
		if (is_null(self::$instance))
		{
			self::$instance = new self();
		}

		return self::$instance;
	}*/

	// -----------------------------

	function __construct()
    {
		self::startConnection();
    }

	private static function startConnection()
	{
		self::$dbcon = new mysqli(self::$host, self::$user, self::$password, self::$db);

		self::checkConnection();
		self::serverIsUp();
	}

	private static function checkConnection()
	{
		// CHECK CONNECTION
		if (self::$dbcon->connect_error)
		{
		    $db_error = self::$dbcon->connect_error;

		    throw new Exception("Connection failed: " . $db_error);
		}
	}

	private static function serverIsUp()
	{
		// CHECK IF SERVER IS ALIVE
		if (self::$dbcon->ping() == false)
		{
		    $db_error = self::$dbcon->error;

			throw new Exception("Database server error: " . $db_error);
		}
	}

	private static function getConnection()
	{
		if(is_null(self::$dbcon))
		{
			self::startConnection();
		}
		else
		{
			self::serverIsUp();
		}

		return self::$dbcon;
	}

	public static function closeConnection()
	{
		if(is_null(self::$dbcon) == false)
		{
			self::serverIsUp();

			self::$dbcon->close();

			self::$dbcon = null;
		}
	}

	public static function startTransaction()
	{
		return self::executeQuery('START TRANSACTION');
	}

	public static function commitTransaction()
	{
		return self::executeQuery('COMMIT');
	}

	public static function rollbackTransaction()
	{
		return self::executeQuery('ROLLBACK');
	}

	public static function executeQuery($query)
	{
		$result = null;

		try
		{
			self::getConnection()->query("SET NAMES 'utf8'");
			self::getConnection()->query("SET character_set_connection=utf8");
			self::getConnection()->query("SET character_set_client=utf8");
			self::getConnection()->query("SET character_set_results=utf8");
			$result = self::getConnection()->query($query);
		}
		catch(Exception $error)
		{
			throw new Exception($error . "\n\n" . $query);
		}

		return $result;
	}

	public static function executeQueryAndGetId($query)
	{
		$result = 0;

		self::getConnection()->query("SET NAMES 'utf8'");
		self::getConnection()->query("SET character_set_connection=utf8");
		self::getConnection()->query("SET character_set_client=utf8");
		self::getConnection()->query("SET character_set_results=utf8");
		$sql = self::getConnection()->query($query);

		if ($sql == true)
	    {
	        $result = self::getConnection()->insert_id;
	    }
	    else
	    {
	        $error = self::getConnection()->error;
	        self::closeConnection();
	        throw new Exception($error . "\n\n" . $query);
	    }

	    return $result;
	}

	public static function executeQueryAndGetNumberOfAffectedRows($query)
	{
		$result = 0;

		try
		{
			self::getConnection()->query("SET NAMES 'utf8'");
			self::getConnection()->query("SET character_set_connection=utf8");
			self::getConnection()->query("SET character_set_client=utf8");
			self::getConnection()->query("SET character_set_results=utf8");
			$result = self::getConnection()->multi_query($query);
		}
		catch(Exception $error)
		{
			throw new Exception($error . "\n\n" . $query);
		}

	    return $result;
	}

	public static function sqlFromString($value, $nullIfEmpty, $checkVariableType = null, $allUppercase = null, $maxLength = null)
	{
		$errorPrefix = "Error while changing string variable to SQL format";

		if((!is_null($checkVariableType) && $checkVariableType && gettype($value) == "string")
		|| (is_null($checkVariableType) || $checkVariableType == false))
		{
			$empty = "''";
			if ($nullIfEmpty)
			{
				$empty = "NULL";
			}

			if ($value == null)
			{
				return "NULL";
			}

			if (strlen($value) == 0)
			{
				return $empty;
			}
			
			$value = str_replace("'", "", trim(strval($value)));
			if (!is_null($maxLength) && $maxLength > 0 && strlen($value) > $maxLength)
			{
				$value = substr($value, 0, $maxLength);
			}

			if(!is_null($allUppercase) && $allUppercase)
			{
				$value = strtoupper($value);
			}

			return "'" . $value . "'";					
		}
		else
		{
			throw new Exception($errorPrefix . ": Value is not a string!");
		}
	}

	public static function sqlFromStringLike($value, $noWildcardIfEmpty, $leftWildcardOnly = null, $rightWildcardOnly = null,
											$checkVariableType = null, $allUppercase = null, $maxLength = null)
	{
		$errorPrefix = "Error while changing string variable to SQL format (w/ like)";

		if((!is_null($checkVariableType) && $checkVariableType && gettype($value) == "string")
		|| (is_null($checkVariableType) || $checkVariableType == false))
		{
			$empty = "''";
			$wildcards = "'%%'";

			if ($value == null)
			{
				if($noWildcardIfEmpty)
				{
					return $empty;
				}
				else
				{
					if((!is_null($leftWildcardOnly) && $leftWildcardOnly) || (!is_null($rightWildcardOnly) && $rightWildcardOnly))
					{
						$newValue = "";
						if($leftWildcardOnly)
						{
							$newValue = "%";
						}

						if($rightWildcardOnly)
						{
							$newValue += "%";
						}

						return "'" . $newValue . "'";
					}
					else
					{
						return "'%%'";
					}
				}
			}
						
			if (strlen($value) == 0)
			{
				if($noWildcardIfEmpty)
				{
					return $empty;
				}
				else
				{
					if((!is_null($leftWildcardOnly) && $leftWildcardOnly) || (!is_null($rightWildcardOnly) && $rightWildcardOnly))
					{
						$newValue = "";
						if($leftWildcardOnly)
						{
							$newValue = "%";
						}

						if($rightWildcardOnly)
						{
							$newValue += "%";
						}

						return "'" . $newValue . "'";
					}
					else
					{
						return "'%%'";
					}
				}
			}

			$value = str_replace("'", "", trim(strval($value)));
			if (!is_null($maxLength) && $maxLength > 0 && strlen($value) > $maxLength)
			{
				$value = substr($value, 0, $maxLength);
			}

			if(!is_null($allUppercase) && $allUppercase)
			{
				$value = strtoupper($value);
			}

			if((!is_null($leftWildcardOnly) && $leftWildcardOnly) || (!is_null($rightWildcardOnly) && $rightWildcardOnly))
			{
				$newValue = $value;
				if($leftWildcardOnly)
				{
					$newValue = "%" . $newValue;
				}

				if($rightWildcardOnly)
				{
					$newValue += "%";
				}

				return "'" . $newValue . "'";
			}
			else
			{
				return "'%" . $value . "%'";
			}
		}
		else
		{
			throw new Exception($errorPrefix . ": Value is not a string!");
		}
	}

	public static function sqlFromInteger($value, $checkVariableType = null)
	{
		$errorPrefix = "Error while changing integer variable to SQL format";

		$valid = false;

		$checking = filter_var($value, FILTER_VALIDATE_INT);

		if((!is_null($checkVariableType) && $checkVariableType && (gettype($value) == "integer" || gettype($checking) == "integer"))
		|| (is_null($checkVariableType) || $checkVariableType == false))
		{
			$valid = true;
		}

		if($valid)
		{
			if ($value == null)
			{
				return "NULL";
			}
			
			$value = str_replace("'", "", trim(strval($value)));

			return $value;
		}
		else
		{
			throw new Exception($errorPrefix . ": Value is not a integer!");
		}
	}

	public static function sqlFromFloat($value, $checkVariableType = null)
	{
		$errorPrefix = "Error while changing float/double variable to SQL format";

		$valid = false;

		$checking = filter_var($value, FILTER_VALIDATE_FLOAT);

		if((!is_null($checkVariableType) && $checkVariableType && (gettype($value) == "double" || gettype($checking) == "double"))
		|| (is_null($checkVariableType) || $checkVariableType == false))
		{
			$valid = true;
		}

		if($valid)
		{
			if ($value == null)
			{
				return "NULL";
			}

			$value = str_replace("'", "", trim(strval($value)));

			return $value;
		}
		else
		{
			throw new Exception($errorPrefix . ": Value is not a float/double!");
		}
	}

	public static function sqlFromBool($value, $checkVariableType = null)
	{
		$errorPrefix = "Error while changing boolean variable to SQL format";

		$valid = false;

		$checking = filter_var($value, FILTER_VALIDATE_BOOLEAN);

		if((!is_null($checkVariableType) && $checkVariableType && (gettype($value) == "boolean" || gettype($checking) == "boolean"))
		|| (is_null($checkVariableType) || $checkVariableType == false))
		{
			$valid = true;
		}

		if($valid)
		{
			if ($value == null)
			{
				return "NULL";
			}

			$value = str_replace("'", "", trim(strval($value)));

			return $value;
		}
		else
		{
			throw new Exception($errorPrefix . ": Value is not a boolean!");
		}
	}

	// DEFAULT SETTINGS: yyyy-mm-dd
	public static function sqlFromDateOnly($value, $nullIfZeroDate, $invertedDate = true, $frenchFormat = null, $separator = null, $checkVariableType = null)
	{
		$errorPrefix = "Error while changing date only variable to SQL format";

		$frenchFormat = ($frenchFormat == null) ? false : $frenchFormat;

		if((!is_null($checkVariableType) && $checkVariableType && isValidDate($value, $frenchFormat))
		|| (is_null($checkVariableType) || $checkVariableType == false))
		{
			if ($value == null || strlen($value) == 0)
			{
				return "NULL";
			}

			$separators = array("/", "-", ".");

			if(!is_null($separator) && !in_array($separator, $data['separators']))
			{
				array_push($data['separators'], $separator);
			}

			$value = mysql_real_escape_string(trim(strval($value)));

			$valueWithoutSepartors = $value;
			foreach($separators as $separator)
			{
				$valueWithoutSepartors = str_replace($separator, "", $valueWithoutSepartors);
			}

			if(strlen($valueWithoutSepartors) == 8)
			{
				if($valueWithoutSepartors == "00000000" && $nullIfZeroDate)
				{
					return "NULL";
				}

				if($invertedDate)
				{
					if($separator != null)
					{
						$newDate = date_parse_from_format("Y" . $separator . "m" . $separator . "d", $value);
					}
					else
					{
						return $value;
					}
				}
				else
				{
					if($frenchFormat)
					{
						if($separator != null)
						{
							$newDate = date_parse_from_format("d" . $separator . "m" . $separator . "Y", $value);
						}
						else
						{
							$newDate = date_parse_from_format("d-m-Y", $value);
						}
					}
					else
					{
						if($separator != null)
						{
							$newDate = date_parse_from_format("m" . $separator . "d" . $separator . "Y", $value);
						}
						else
						{
							$newDate = date_parse_from_format("m-d-Y", $value);
						}
					}
				}

				return "'" . $newDate["year"] . "-" . $newDate["month"] . "-" . $newDate["day"] . "'";
			}
			else
			{
				throw new Exception($errorPrefix . ": Value is not a valid date only!");
			}
		}
		else
		{
			throw new Exception($errorPrefix . ": Value is not a date only!");
		}
	}

	function isValidDate($date, $frenchFormat, $separator = null)
	{
		$data = [
			'separators' => array("/", "-", "."),
			'date_array' => '',
			'day_index' => '',
			'year' => '',
			'month' => '',
			'day' => '',
			'status' => false
		];

		if(!is_null($separator) && !in_array($separator, $data['separators']))
		{
			array_push($data['separators'], $separator);
		}

		// loop through to break down the date
		foreach ($data['separators'] as $separator)
		{
			$data['date_array'] = explode($separator, $date);
			if (count($data['date_array']) == 3)
			{
				$data['status'] = true;
				break;
			}
		}

		// err, if more than 4 character or not int
		if ($data['status'])
		{
			foreach ($data['date_array'] as $value)
			{
				if (strlen($value) > 4 || !is_numeric($value))
				{
					$data['status'] = false;
					break;
				}
			}
		}

		// get the year
		if ($data['status'])
		{
			if (strlen($data['date_array'][0]) == 4)
			{
				$data['year'] = $data['date_array'][0];
				$data['day_index'] = 2;
			}
			elseif (strlen($data['date_array'][2]) == 4)
			{
				$data['year'] = $data['date_array'][2];
				$data['day_index'] = 1;
				if($frenchFormat)
				{
					$data['day_index'] = 0;				
				}
			}
			else
			{
				$data['status'] = false;
			}
		}

		// get the month
		if ($data['status'])
		{
			if (strlen($data['date_array'][1]) == 2)
			{
				if (strlen($data['date_array'][2]) == 4)
				{
					$data['month'] = $data['date_array'][0];
					if($frenchFormat)
					{
						$data['month'] = $data['date_array'][1];
					}
				}
				else
				{
					$data['month'] = $data['date_array'][1];
				}
			}
			else
			{
				$data['status'] = false;
			}
		}

		// get the day
		if ($data['status'])
		{
			if (strlen($data['date_array'][$data['day_index']]) == 2)
			{
				$data['day'] = $data['date_array'][$data['day_index']];
			}
			else
			{
				$data['status'] = false;
			}
		}

		// finally validate date
		if ($data['status'])
		{
			return checkdate($data['month'] , $data['day'], $data['year']);
		}

		return false;
	}

	function toIntFromSQL()
	{
		
	}
}