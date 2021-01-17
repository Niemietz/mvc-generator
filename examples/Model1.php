<?php

require_once(__DIR__.'/SuperClass/eModelList.php');

require_once(__DIR__.'/Offer.php');
require_once(__DIR__.'/Format.php');
require_once(__DIR__.'/Partner.php');
require_once(__DIR__.'/Category.php');
require_once(__DIR__.'/RescueType.php');

class Offers extends eModelList
{
	public function read()
	{
        $sql = null;

        try
        {
            $sql = DAO::executeQuery($this->getReadQuery()); 
        }
        catch(Exception $error)
        {
            throw new Exception("Select db_ofertas error:<br>".$error);
        }

        if(mysqli_num_rows($sql) > 0)
        {
            while($row = $sql->fetch_array(MYSQL_ASSOC))
            {
            	$offer = new Offer();

                $offer->setId($row['id']);
                $offer->setTitle($row['titulo']);
                $offer->setExtra($row['extra']);
                $offer->setDiscount(floatval($row['desconto']));
                $offer->setStartDate($row['data_inicial']);
                $offer->setFinalDate($row['data_final']);
                $offer->setHas3Steps(($row['data_final'] == "1") ? true : false);
                $offer->setStep1($row['passo_1']);
                $offer->setStep2($row['passo_2']);
                $offer->setStep3($row['passo_3']);
                $offer->setCupom($row['cupom']);
                $offer->setLink($row['link']);

                $format = new Format();
                $format->setId($row['id_formato']);
                $format->setFormat($row['formato']);

                $partner = new Partner();
                $partner->setId($row['id_parceiro']);
                $partner->setName($row['parceiro']);
                $partner->setAbout($row['sobre']);
                $partner->setBackgroundColor($row['cor_fundo']);

                $rescueType = new RescueType();
                $rescueType->setId($row['id_tipo_resgate']);
                $rescueType->setType($row['tipo']);

                $offer->setFormat($format);
                $offer->setPartner($partner);
                $offer->setRescueType($rescueType);

                $this->add($offer);
            }
        }
    }

	public function readThroughCategory($categoryId)
	{
        $query = $this->getReadQuery(true);
        $query .= " WHERE c.id = " . $categoryId;

        $sql = null;

        try
        {
            $sql = DAO::executeQuery($query); 
        }
        catch(Exception $error)
        {
            throw new Exception("Select db_ofertas error:<br>".$error);
        }

        if(mysqli_num_rows($sql) > 0)
        {
            while($row = $sql->fetch_array(MYSQL_ASSOC))
            {
            	$offer = new Offer();

                $offer->setId($row['id']);
                $offer->setTitle($row['titulo']);
                $offer->setExtra($row['extra']);
                $offer->setDiscount(floatval($row['desconto']));
                $offer->setStartDate($row['data_inicial']);
                $offer->setFinalDate($row['data_final']);
                $offer->setHas3Steps(($row['data_final'] == "1") ? true : false);
                $offer->setStep1($row['passo_1']);
                $offer->setStep2($row['passo_2']);
                $offer->setStep3($row['passo_3']);
                $offer->setCupom($row['cupom']);
                $offer->setLink($row['link']);

                $format = new Format();
                $format->setId($row['id_formato']);
                $format->setFormat($row['formato']);

                $category = new Category();
                $category->setId($row['id_categoria']);
                $category->setCategory($row['categoria']);

                $partner = new Partner();
                $partner->setId($row['id_parceiro']);
                $partner->setName($row['parceiro']);
                $partner->setAbout($row['sobre']);
                $partner->setBackgroundColor($row['cor_fundo']);
                $partner->setCategory($category);

                $rescueType = new RescueType();
                $rescueType->setId($row['id_tipo_resgate']);
                $rescueType->setType($row['tipo']);

                $offer->setFormat($format);
                $offer->setPartner($partner);
                $offer->setRescueType($rescueType);

                $this->add($offer);
            }
        }
    }

	public function readThroughPartner($partnerId)
	{
        $query = $this->getReadQuery(true);
        $query .= " WHERE p.id = " . $partnerId;

        $sql = null;

        try
        {
            $sql = DAO::executeQuery($query); 
        }
        catch(Exception $error)
        {
            throw new Exception("Select db_ofertas error:<br>".$error);
        }

        if(mysqli_num_rows($sql) > 0)
        {
            while($row = $sql->fetch_array(MYSQL_ASSOC))
            {
            	$offer = new Offer();

                $offer->setId($row['id']);
                $offer->setTitle($row['titulo']);
                $offer->setExtra($row['extra']);
                $offer->setDiscount(floatval($row['desconto']));
                $offer->setStartDate($row['data_inicial']);
                $offer->setFinalDate($row['data_final']);
                $offer->setHas3Steps(($row['data_final'] == "1") ? true : false);
                $offer->setStep1($row['passo_1']);
                $offer->setStep2($row['passo_2']);
                $offer->setStep3($row['passo_3']);
                $offer->setCupom($row['cupom']);
                $offer->setLink($row['link']);

                $format = new Format();
                $format->setId($row['id_formato']);
                $format->setFormat($row['formato']);

                $category = new Category();
                $category->setId($row['id_categoria']);
                $category->setCategory($row['categoria']);

                $partner = new Partner();
                $partner->setId($row['id_parceiro']);
                $partner->setName($row['parceiro']);
                $partner->setAbout($row['sobre']);
                $partner->setBackgroundColor($row['cor_fundo']);
                $partner->setCategory($category);

                $rescueType = new RescueType();
                $rescueType->setId($row['id_tipo_resgate']);
                $rescueType->setType($row['tipo']);

                $offer->setFormat($format);
                $offer->setPartner($partner);
                $offer->setRescueType($rescueType);

                $this->add($offer);
            }
        }
    }

    public function insert()
    {
        $result = true;

        foreach($this->getList() as $offer)
        {
            if($offer->insert() == 0)
            {
                $result = false;
                break;
            }
        }

        return $result;
    }
    
    public function search($searchQuery)
	{
        $query = $this->getReadQuery(true);
        $query .= " WHERE UPPER(o.titulo) LIKE UPPER('%" . $searchQuery . "%')";
        $query .= " OR UPPER(p.nome) LIKE UPPER('%" . $searchQuery . "%')";
        $query .= " OR UPPER(c.categoria) LIKE UPPER('%" . $searchQuery . "%')";

        $sql = null;

        try
        {
            $sql = DAO::executeQuery($query); 
        }
        catch(Exception $error)
        {
            throw new Exception("Select db_ofertas error:<br>".$error);
        }

        if(mysqli_num_rows($sql) > 0)
        {
            while($row = $sql->fetch_array(MYSQL_ASSOC))
            {
            	$offer = new Offer();

                $offer->setId($row['id']);
                $offer->setTitle($row['titulo']);
                $offer->setExtra($row['extra']);
                $offer->setDiscount($row['desconto']);
                $offer->setStartDate($row['data_inicial']);
                $offer->setFinalDate($row['data_final']);
                $offer->setHas3Steps(($row['data_final'] == "1") ? true : false);
                $offer->setStep1($row['passo_1']);
                $offer->setStep2($row['passo_2']);
                $offer->setStep3($row['passo_3']);
                $offer->setCupom($row['cupom']);
                $offer->setLink($row['link']);

                $format = new Format();
                $format->setId($row['id_formato']);
                $format->setFormat($row['formato']);

                $category = new Category();
                $category->setId($row['id_categoria']);
                $category->setCategory($row['categoria']);

                $partner = new Partner();
                $partner->setId($row['id_parceiro']);
                $partner->setName($row['parceiro']);
                $partner->setAbout($row['sobre']);
                $partner->setBackgroundColor($row['cor_fundo']);
                $partner->setCategory($category);

                $rescueType = new RescueType();
                $rescueType->setId($row['id_tipo_resgate']);
                $rescueType->setType($row['tipo']);

                $offer->setFormat($format);
                $offer->setPartner($partner);
                $offer->setRescueType($rescueType);

                $this->add($offer);
            }
        }
    }

    private function getReadQuery($includeCategory = false)
    {
        $query = "SELECT o.id, o.titulo, o.extra, o.desconto, o.data_inicial, o.data_final, o.tem_3_passos, o.passo_1, o.passo_2, o.passo_3, o.cupom, o.link,";
        $query .= " f.id AS id_formato, f.formato,";
        $query .= " t.id AS id_tipo_resgate, t.tipo,";
        if(!is_null($includeCategory) && $includeCategory == true)
        {
            $query .= " c.id AS id_categoria, c.categoria,";
        }
        $query .= " p.id AS id_parceiro, p.nome AS parceiro, p.sobre, p.cor_fundo";
        $query .= " FROM db_ofertas o";
        $query .= " LEFT OUTER JOIN db_parceiros p ON o.id_parceiro = p.id";
        if(!is_null($includeCategory) && $includeCategory == true)
        {
            $query .= " LEFT OUTER JOIN db_parceiros_categorias pc ON pc.id_parceiro = p.id";
            $query .= " LEFT OUTER JOIN db_categorias c ON pc.id_categoria = c.id";
        }
        $query .= " LEFT OUTER JOIN db_formatos_oferta f ON o.id_formato = f.id";
        $query .= " LEFT OUTER JOIN db_tipos_resgate t ON o.id_tipo_resgate = t.id";

        return $query;
    }
}