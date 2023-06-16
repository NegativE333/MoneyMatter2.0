

import getExpByUserId from "@/actions/getExpByUserId";
import Header from "@/components/Header";
import PageContent from "@/components/PageContent";

export const revalidate = 0;

export default async function Home() {
  
  const exps = await getExpByUserId();
  let flag = false;
  if(exps.length === 0){
    flag = true;
  }

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header loc="home">
      </Header>
      {flag ? (
        <div className="flex items-center justify-center w-full">
          <h1 className="font-bold text-3xl mt-6">
            No expense added.
          </h1>
        </div>
      ): (
        <div>
        <PageContent exps={exps}/>
        </div>
      )}
      
    </div>
  );
}
